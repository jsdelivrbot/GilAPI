/* 
TODO: Port from Powershell.

#ARKData version 2.0
#
#Init settings
$ARKDataBinDir = (Get-Location).path #Where ARKData.ps1 is ran from.
$ARKDataDataDir = "C:\Dropbox\www\ARKData\data" #Where ARKData stores its data files.
$ARKDataWebDir = "C:\Dropbox\www\ARKData" #Where ARKData writes its website files.
$ARKDataImagesDir = "C:\Dropbox\www\Images" #Where ARKData writes its website files.
#
#
# cd C:\Dropbox\www\ARKData\bin
# ipmo .\arkdata.ps1
# Start-ARKDataTask
# 
# http://localhost:65530/?API=map

#region always runs
#Test if paths are valid:
if (!(Test-Path $ARKDataDataDir)) { 
	write-host $ARKDataDataDir "is not a valid directory, please check `$ARKDataDataDir in your init settings at the top of ARKData.ps1.`nDid not load ARKData module." -f "Red"
	break
} elseif (!(Test-Path $ARKDataWebDir)) { 
	write-host $ARKDataWebDir "is not a valid directory, please check `$ARKDataWebDir in your init settings at the top of ARKData.ps1.`nDid not load ARKData module." -f "Red"
	break
} elseif (!(Test-Path ($ARKDataImagesDir + "\ARK"))) { 
	write-host "$ARKDataWebDir\ARK is not a valid directory, please check `$ARKDataWebDir in your init settings at the top of ARKData.ps1.`nDid not load ARKData module." -f "Red"
	break
}else {
	(cat "$ARKDataBinDir\ARKData.ps1" | Select-String "Function") | select -skip 1
	write-host "Directories validated." -f "Yellow"
	write-host "Type " -f "Yellow" -nonewline; write-host "Start-ARKDataTask" -f  "Green" -nonewline; write-host " to start ARKData." -f "Yellow"
}
New-Alias -Name ias -Value Invoke-ARKDataSQL -force
[console]::Title = "Windows PowerShell -ARKData"
#endregion

#region Ops 
Function Start-ARKDataTask {
	#Starts jobs then runs console application.
	start-job { 
		while ($true) {
			ipmo "C:\Dropbox\www\ARKData\bin\ARKData.ps1" ; 
			ipmo "C:\Dropbox\www\ARKData\bin\SteamQuery.ps1" ; 
			ipmo "C:\Dropbox\www\PS1\PowerGIL.ps1" ; 
			Export-SQLTable (Get-ArkdataSteamOfficialServers) "DedicatedPhysicalServerTable" -ColumnNames ServerName,ServerIP -TestingQuery "" 
			sleep 3600
		}; #end while true
	}
	start-job { 
		while ($true) {
			ipmo "C:\Dropbox\www\ARKData\bin\ARKData.ps1" ; 
			ipmo "C:\Dropbox\www\ARKData\bin\SteamQuery.ps1" ; 
			ipmo "C:\Dropbox\www\PS1\PowerGIL.ps1" ; 
			Invoke-ScanARKDataPhysical "DedicatedPhysicalServerTable" 
			sleep 600
		}; #end while true
	}
	start-job { 
		while ($true) {
			ipmo "C:\Dropbox\www\ARKData\bin\ARKData.ps1" ; 
			ipmo "C:\Dropbox\www\ARKData\bin\SteamQuery.ps1" ; 
			ipmo "C:\Dropbox\www\PS1\PowerGIL.ps1" ; 
			Invoke-ScanARKDataVirtual "DedicatedVirtualServerTable" 
			sleep 600
		}; #end while true
	}
	
	start-job { 
		while ($true) {
			ipmo "C:\Dropbox\www\ARKData\bin\ARKData.ps1" ; 
			ipmo "C:\Dropbox\www\ARKData\bin\SteamQuery.ps1" ; 
			ipmo "C:\Dropbox\www\PS1\PowerGIL.ps1" ; 
			Out-ARKDataPlayerIndex 
			sleep 360
		}; #end while true
	}
	
	Get-ARKDataTask
}; #end Start-ARKDataTask

Function Get-ARKDataTask {
	#Application - displays job output to console.
	#Application - displays job output to console.
	while ($true) {
		foreach ($job in (get-job) ){
			cls ;
			write-host "Date:" (get-date)  "Job:" $Job.name "Length:"  $job.length "Has data:" $job.HasMoreData ; 
			get-job | where {$_.State -match "Running"} | select ID, State, HasMoreData, Command #| FL ; 
			$recjob = receive-job $job.id
			if  ($recjob.length -gt 3) {
				$recjob[-3..-1]
			} else {
				$recjob
			}; #end if recjob
			sleep 10
		}; #end foreach job
	}; #end while true
}; #end Get-ARKDataTask

#endregion

#region Transform

Function Get-PlayersTrackedLastMinute {
	Param (
		[int]$Minutes = 1
		#[string]$FileName
	); #end Param
	ias "select PlayerName=(select SteamName from PlayerTable where PlayerID = PlayerTable.ID),ServerName=(select ServerName from DedicatedVirtualServerTable where ServerID = DedicatedVirtualServerTable.ID),Firstseen=(select Firstseen from PlayerTable where PlayerID = PlayerTable.ID),Timeseen from PlayerTracking where PlayerID <> '' and Timeseen > '$((get-date).AddMinutes(-$Minutes))' order by firstseen, playername"  | where {$_.PlayerName.length -le 19 } | where {$_.PlayerName.length -ge 3}
	#ias "select SteamName,ServerName=(select ServerName from DedicatedVirtualServerTable where ServerID = DedicatedVirtualServerTable.ID),Firstseen,Timeseen=(select Timeseen from PlayerTracking where PlayerID = DedicatedVirtualServerTable.ID) from PlayerTracking where PlayerID <> '' and Timeseen > '$((get-date).AddMinutes(-$Minutes))' order by firstseen, playername" 
}; #end Get-SteamPlayersLastMinute

Function Add-ARKDataDedicatedVirtualServerTable {
	Param (
		$TableColumns = "ID INT IDENTITY(1,1) PRIMARY KEY, PhysicalServerID INT, Port INT, ServerName varchar(255), FirstSeen datetime, Lastseen datetime, last_connection_successful BIT, CONSTRAINT UC_VIRT UNIQUE (PhysicalServerID,Port)",
		$TableName = "DedicatedVirtualServerTable",
		[switch]$DropTable
	); #end param
	if ($DropTable){
		ias "Drop table $($TableName )"
	}; #end if DropTable
	ias "Create table $($TableName ) ($TableColumns)"
	$TableName

}; #end Add-ARKDataServerTable

Function Add-SeenARKDataPlayers {
	Param (
		[array]$Players,
		[array]$ServerName,
		[String]$PlayerTable = "PlayerTable",
		[String]$TrackingTable = "PlayerTracking",
		[String]$DedicatedVirtualServerTable = "DedicatedVirtualServerTable"
	); #end param
	
	#Steam auto-truncates names to 19 character max, so longer than this is garbage data.
	foreach ($Player in ($Players | where {$_.player.length -le 19})) {
		$PlayerName = $Player.player
		$GetDate = Get-Date
		ias "if exists (select distinct * from $PlayerTable where Steamname = '$($PlayerName)')`n`rbegin; update $PlayerTable set lastseen  = '$($GetDate)' where Steamname = '$($PlayerName)'; end; else Insert into $PlayerTable values ('$($PlayerName)','$($GetDate)','$($GetDate)')"
		
		ias "Insert into $TrackingTable (PlayerID, ServerID, Timeseen) select (select ID from $PlayerTable where SteamName = '$($PlayerName)'),(select ID from $DedicatedVirtualServerTable where ServerName = '$($ServerName)'),'$($GetDate)'"
	}; #end foreach Player

}; #end Add-SeenARKDataPlayers

Function Add-SeenARKDataPhysicalServers {
	Param (
		[array]$Servers,
		[String]$ServerTable = "DedicatedPhysicalServerTable"
	); #end param
	
	foreach ($Server in $Servers) {
		[String]$ServerName = $Server.ServerName
		$ServerIP = $Server.ServerIP
		$GetDate = Get-Date
		ias "if exists (select distinct * from $ServerTable where ServerName = '$($ServerName)')`n`rbegin; Update $ServerTable set LastSeen = '$($GetDate)',last_connection_successful = '$($ConnectionSuccessful)',ServerIP = '$($ServerIP)' where ServerName = '$($ServerName)'; end; else Insert into $ServerTable values ('$($ServerName)','$($ServerIP)','$($GetDate)','$($GetDate)','$($ConnectionSuccessful)')"  -ShowErrors
		
		#ias "Update $ServerTable set last_connection_successful = '$($ConnectionSuccessful)',ServerIP = '$($ServerIP)' where ServerName = '$($ServerName)';"

	}; #end foreach Server
}; #end Add-SeenARKDataPhysicalServers

Function Add-SeenARKDataDedicatedVirtualServer {
	Param (
		[Parameter(Mandatory=$True)][String]$PhysicalServerName,
		[Parameter(Mandatory=$True)][String]$VirtualServerName,
		[Parameter(Mandatory=$True)][int]$Port,
		[Switch]$ConnectionSuccessful,
		[String]$VirtualServerTable = "DedicatedVirtualServerTable",
		[String]$DedicatedPhysicalTable = "DedicatedPhysicalServerTable" 
		#[int]$PhysicalServerID = ((ias "select ID from $DedicatedPhysicalTable where ServerName = '$PhysicalServerName'").ID)
	); #end param
		
	$GetDate = Get-Date
	
	ias "if exists (select distinct * from $VirtualServerTable where ServerName = '$($VirtualServerName)')`n`rbegin; Update $VirtualServerTable set LastSeen = '$($GetDate)', last_connection_successful = '$($ConnectionSuccessful)', ServerName = '$($VirtualServerName)' where PhysicalServerID = (select ID from $DedicatedPhysicalTable where ServerName = '$PhysicalServerName') and Port = $Port; end; else Insert into $VirtualServerTable values ((select ID from $DedicatedPhysicalTable where ServerName = '$PhysicalServerName'),'$($Port)','$VirtualServerName','$($GetDate)','$($GetDate)','$($ConnectionSuccessful)')"  -ShowErrors

}; #end Add-SeenARKDataDedicatedVirtualServer
	
#endregion


<#
CREATE FUNCTION dbo.fnBinaryIPv4(@ip AS VARCHAR(15)) RETURNS BINARY(4)
AS
BEGIN
    DECLARE @bin AS BINARY(4)

    SELECT @bin = CAST( CAST( PARSENAME( @ip, 4 ) AS INTEGER) AS BINARY(1))
                + CAST( CAST( PARSENAME( @ip, 3 ) AS INTEGER) AS BINARY(1))
                + CAST( CAST( PARSENAME( @ip, 2 ) AS INTEGER) AS BINARY(1))
                + CAST( CAST( PARSENAME( @ip, 1 ) AS INTEGER) AS BINARY(1))

    RETURN @bin
END
go
#>


#region Data

Function Invoke-ARKDataSQL {
	[CmdletBinding()]
    param(
		[ValidateSet("Select","Insert","Update","Delete")]
		[string]$CRUD = "Select",
		[string]$ColumnName = "*",
		[ValidateSet("From","Into","Set")]
		[string]$CRUDAdjuster = "From",
        [string]$Table = "PlayerTable",
		[string]$WhereCondition,
        [string]$Database = "ArkDB",
        [switch]$ShowErrors,
        [switch]$NoCredentials,
        [switch]$DropTable,
		[string]$Username = "arkdba",
		[string]$Password = "bwkAso4eN7CBoAL8",
		[int]$QueryTimeout = 10,
		[int]$ConnectionTimeout = 30,
        #[string]$ServerInstance = "Gaming\GILEXPRESS,56712",
		[Parameter(Position=1)]
		[string]$Query = "Use $DataBase $CRUD $ColumnName $CRUDAdjuster $Table $WhereCondition",
		$Parms = @{
			#'ServerInstance' = $ServerInstance
			'QueryTimeout' = $QueryTimeout
			'ConnectionTimeout' = $ConnectionTimeout
			'ShowErrors' = $ShowErrors
			'NoCredentials' = $NoCredentials
			'DropTable' = $DropTable
			'Database' = $Database
			'Table' = $Table
			'Query' = $Query
		}
	); #end Param
	
	Write-Verbose "Query $Query"
	Write-Verbose "DataBase: $DataBase"
	#Write-Verbose "ServerInstance: $ServerInstance"
	
	if ($UserName) {
		$parms += @{
			'Username' = $UserName;
			'Password' = $Password;
		}; #end Parms
		Write-Verbose "Username: $Username"
		Write-Verbose "Password: $Password"
	}; #end UserName

	$Response = i @parms 
	$Response
}; #end Invoke-ARKDataSQL

Function Invoke-ScanARKDataPhysical {
	Param (
		[String]$DedicatedPhysicalTable = "DedicatedPhysicalServerTable",
		[String]$DedicatedVirtualTable = "DedicatedVirtualServerTable",
		$Ports = (27015,27017,27019),
		$Servers = (ias -t $DedicatedPhysicalTable)
	); #end param

	$RandomNumber = Get-Random -max 10 -min 0
	if ($RandomNumber -ne 8 ) {
		$Servers = $Servers | where {$_.last_connection_successful -eq $True}
	}
	
	foreach ($Server in $Servers) {
		#if (Test-NetConnection $Server.serverip) {
			$ServerName = $Server.ServerName
			$ServerIP = $Server.ServerIP
			Write-Verbose $ServerName
			$ConnectionSuccessful = $False
			if ($ServerIP.length -gt 0 ) {
				foreach ($Port in $Ports) {
					Write-Verbose "$Server.ServerIP : $Port"
					
					$Rules = (Get-SteamServerRules $ServerIP $port)
					If ($Rules) {
						$ConnectionSuccessful = $True
						Add-SeenARKDataDedicatedVirtualServer -PhysicalServerName $ServerName -VirtualServerName ($Rules.CUSTOMSERVERNAME | Convert-SymbolsToUnderscore) -Port $port -ConnectionSuccessful
					} else {
						$VirtualServerName = (ias "Select ServerName from $DedicatedVirtualTable where PhysicalServerID = (Select ID from $DedicatedPhysicalTable where ServerName = '$ServerName') and Port = $Port").ServerName
						Add-SeenARKDataDedicatedVirtualServer -PhysicalServerName $ServerName -VirtualServerName $VirtualServerName -Port $port
					}; #end if Rules
				}; #end foreach Port
			}; #end if Server.serverip.length 
			
			$Parm = @{
				"ConnectionSuccessful" = $ConnectionSuccessful
				"Servers" = $Server
			}
			Add-SeenARKDataPhysicalServers @parm
		#}; #end if Test_NetConnection
	}; #end foreach Server
}; #end Add-SeenARKDataPlayers
	
Function Invoke-ScanARKDataVirtual {
	Param (
		$TableName = "DedicatedVirtualServerTable",
		$Servers = (ias -t $TableName)
	); #end param

	foreach ($Server in $Servers) {
		$ServerName = $Server.ServerName
		Write-Verbose $ServerName
		$serverip = (ias -t "DedicatedPhysicalServerTable" -ColumnName ServerIP -where "where ID = $($Server.PhysicalServerID)").serverip
		$Players = (Get-SteamServerPlayers $serverip $Server.port)
		Add-SeenARKDataPlayers $Players $ServerName
	}; #end foreach Server
}; #end Add-ScanARKData

#endregion

#region HTML
 
Function Out-ARKDataPlayerIndex {
	[CmdletBinding()]
	Param(
		$InputObject = (Get-PlayersTrackedLastMinute 10 | sort -Unique FirstSeen | sort ServerName | select PlayerName,ServerName,Firstseen,Timeseen),
		$IndexTitle = "ARKData Server Page",
		$IndexFile = "$ARKDataWebDir\index.html" 
	); #end Param
	Write-Verbose $IndexFile
	#Get-PlayersTrackedLastMinute 10 | sort ServerName | select PlayerName,ServerName,Firstseen,Timeseen | ConvertTo-Html > C:\Dropbox\www\ARKData\playertracker.html; 
	$toppart > $IndexFile #Header
	#Write-Verbose (gc $IndexFile)
	$IndexTitle >> $IndexFile #Title
	$gilgabanner >> $IndexFile #Gilgamech Technologies banner
	$subbannersubpage >> $IndexFile #Sub-banner.
	$indexsubpage >> $IndexFile #Servers being tracked:
	
	foreach ($ServerName in ($InputObject.servername | select -Unique)) {
		Write-Verbose $ServerName
		$ServerField = $InputObject | where {$_.servername -eq $ServerName} | ConvertTo-Html
		[string]$PageTitle = "$ServerName"
		[string]$FileName = "$ARKDataWebDir\$ServerName.html" 
		Write-Verbose $FileName
		
		$toppart > $FileName #Header
		#Write-Verbose (gc $FileName)
		$PageTitle >> $FileName #Title
		$gilgabanner >> $FileName #Gilgamech Technologies banner
		$subbannersubpage >> $FileName #Sub-banner.
		$indexsubpage >> $FileName #Servers being tracked:
		
		$ServerField >> $FileName
		
		$endpart >> $FileName #Page still under development
		$tailpart >> $FileName #Footer and banner ads
	
		$Serverone >> $IndexFile #HTML before ServerName to set up link
		$ServerName >> $IndexFile
		$Servertwo >> $IndexFile #HTML to close link and set up text display
		$ServerName >> $IndexFile
		$Serverthree>> $IndexFile #HTML after ServerName to close text display
	}; #end foreach
	
	$endpart >> $IndexFile #Page still under development
	$tailpart >> $IndexFile #Footer and banner ads
}; #end Out-ARKDataPlayerIndex
	
# endregion

#region Archive

Function Get-ServerCountsLastMinute($Minutes = 1) {
	Get-PlayersTrackedLastMinute $Minutes| group servername | sort count -Descending | select count, name
}; #end Get-SteamPlayersLastMinute

Function Import-ARKDataTribeCSVIntoSQL {
	Export-SQLTable (Import-Csv C:\Dropbox\www\ARKData\data\assets\.tribe.csv ) -verbose  -seen TribeTableTest3 -NullValues '???', 'N/A', 'No Tribe' -ColumnNamesToNull "ARKName","TribeName"
	Export-SQLTable (Import-Csv C:\Dropbox\www\ARKData\.tribe.csv ) -verbose TribeTableTest3 -NullValues '???', 'N/A', 'No Tribe' -ColumnNamesToNull "ARKName","TribeName"
	Export-SQLTable (Import-Csv C:\Dropbox\www\ARKData\tribe.csv ) -verbose TribeTableTest3 -NullValues '???', 'N/A', 'No Tribe' -ColumnNamesToNull "ARKName","TribeName"
}; #end Import-ARKDataTribeCSVIntoSQL

Function Get-ARKDataPlayers($ServerName) {
	Get-PlayersTrackedLastMinute 10 | where {$_.ServerName -eq $ServerName}
}; #end Get-ARKDataPlayers

Function Get-ARKDataPlayersLastDay($ServerName) {
	Get-PlayersTrackedLastMinute 1440  | where {$_.ServerName -eq $ServerName}
}; #end Get-ARKDataPlayersLastDay

Function Get-ARKDataFileDate {
	#Get-ARKDataFileDate 2016-03-16-00-07-02
	Param (
		[Parameter(Mandatory=$True)][string]$FileName
	); #end Param
	
	$FileName = $FileName.split(".")[0]
	Get-Date -year $FileName.split("-")[0] -month $FileName.split("-")[1] -day $FileName.split("-")[2] -hour $FileName.split("-")[3] -minute $FileName.split("-")[4] -second $FileName.split("-")[5]
}; #end Get-ARKDatatFileDate

Function Invoke-RandomARKDataMapBG {
	Param(
		[Parameter(Mandatory=$True)][string]$MapName
	); #end Param
	$RandomMapName = Get-ChildItem ($ARKDataImagesDir +"\ARK\"+ $MapName) -File | Get-Random | Select-Object -ExpandProperty Name
	Copy-Item ($ARKDataImagesDir +"\ARK\"+ $MapName + "\" + $RandomMapName) ($ARKDataImagesDir +"\ARKMap.jpg") -Force
	
	$RandomAdName = Get-ChildItem ($ARKDataImagesDir +"\ads\") -File | Get-Random | Select-Object -ExpandProperty Name
	Copy-Item ($ARKDataImagesDir +"\ads\" + $RandomAdName) ($ARKDataImagesDir +"\BannerImage.jpg") -Force
	# Need to replace the .jpg with file's actual file type.
	
}; #end Out-ARKDataPlayerFiles
 
Function Invoke-ArchiveARKDataHTMLFiles {
	$FilesToArchive = (ls "$ARKDataWebDir\*.html" -File  | where { $_ -notmatch "index" } | where {$_.LastWriteTime -lt (Get-Date).AddDays(-1) } ).name
	if ($FilesToArchive) {
		Move-Item $FilesToArchive "$ARKDataWebDir\Archive\"
	}; #end if FilesToArchive
}; #end Invoke-ArchiveARKDataHTMLFiles 

Function Run-ARKDataTask {
	Param(
		[Parameter(Mandatory=$True)][ipaddress]$ServerIP,
		[Parameter(Mandatory=$True)][int]$ServerPort
	); #end params

	$ARKDataBinDir
	while ($true) {
		$ARKDataBinDir = "C:\Dropbox\www\ARKData\bin"

		#run these tasks
		#ARKData scraper, downloads and parses data packet, outputs to files.
		$ARKData = Get-ARKDataPayload $ServerIP $ServerPort 
		[string]$ServerName = Get-ARKDataServerName $ARKData 
		[string]$MapName = $ARKData.info.map
		[string]$ServerFolder = "$ARKDataDataDir\$ServerName"
		
		Test-ARKDataHostDirs $ServerName
		Out-ARKDataPlayerFiles $ARKData
		Out-ARKDataTribeDB $ARKData

		#Start-Process -filepath powershell.exe -argumentlist 'Out-ARKDataPlayersFile $ServerName'

		#ARKData webpage generator. Calls ARKData output data combiner.
		Out-ARKDataWebpage $ServerName $MapName

		#ARKData player reports, these take a long time.
		Get-ARKDataPlayersLastDay $ServerName

		#Push the ArkMap CSV to JSON.
		Convert-ARKDataFilesToJSON
		
		#Main page
		#Do this stuff once an hour: 
		if ((get-date).minute -eq 0 ) {
			Out-ARKDataIndex
			Get-ARKDataOfficialServers
			Invoke-RandomARKDataMapBG $MapName
		}; #end if 
		#pause 60
		$sleeptime = 60-(get-date).second
		Sleep ($sleeptime)
	}; #end while

}; #end Run-ARKDataTask

Function Out-ARKDataPlayerFiles {
	Param(
		[Parameter(Mandatory=$True)][object]$ARKData
	); #end Param
	#get latest scrape, parse, data for players with names
	$players = $ARKData.players | where {$_.name -ne ""} 
	$ServerName = Get-ARKDataServerName $ARKData
	#Populates the player files
	foreach ($player in $players) {
		#Cleanse brackets that break things
		$playername = $player.name | Convert-SymbolsToUnderscorePlayerName

		#Get the current time, add to $player
		$ARKtime = get-date -format yyyy-MM-dd-HH-mm-ss
		$player = $player | Add-Member @{CurrentTime=$ARKtime} -passthru
	
		#write file
		Export-Csv -path "$ARKDataDataDir\$ServerName\player\$playername.csv" -append -InputObject $player -force
	
	}; #end foreach
}; #end Out-ARKDataPlayerFiles

Function Out-ARKDataTribeDB {
	Param(
		[Parameter(Mandatory=$True)]
		[object]$ARKData
	); #end Param
	$ARKtime = get-date -format yyyy-MM-dd-HH-mm-ss
	#get latest scrape, parse, data for players with names
	$players = $ARKData.players | where {$_.name -ne ""} 

	#Who's online but not in .tribe.csv?
	foreach ($player in $players) {

		$playername = $player.name | Convert-SymbolsToUnderscorePlayerName 
		$Tribe = import-csv "$ARKDataWebDir\tribe.csv"

		#JOIN .tribe.csv with the $ARKData packet, adds ARK name and Tribe name to online players.
		$playerdata = $Tribe | where {$_."SteamName" -eq $playername } | select "SteamName" ;

		if ($playerdata."SteamName".length -le 0 ) { #write-host $player.name } } 

			#Add default values
			$addplayer = "$playername, $playername ???,N/A"
			$addplayer = $addplayer | Add-Member @{"SteamName"=$playername} -passthru
			$addplayer = $addplayer | Add-Member @{"ARKName"="$playername ???"} -passthru
			$addplayer = $addplayer | Add-Member @{"TribeName"="N/A"} -passthru
			$addplayer = $addplayer | Add-Member @{"FirstSeen"=$ARKtime} -passthru

			#Update the CSV with the missing players
			Export-Csv -path "$ARKDataWebDir\tribe.csv" -append -InputObject $addplayer -force

		}; #end if playerdata
	}; #end foreach player
}; #end Out-ARKDataTribeDB

Function Out-ARKDataWebpage {
	Param(
		[Parameter(Mandatory=$True)][string]$ServerName,
		[Parameter(Mandatory=$True)][string]$MapName
	)

	$ServerName = $ServerName | Convert-SymbolsToUnderscore
	$datestartpart = (get-date) 
	$ServerFolder = "$ARKDataDataDir\$ServerName"
	$ARKDataPlayers = Get-ARKDataPlayers $ServerName
	#Shows timestamp if people are playing, otherwise sleeping.

	if ($ARKDataPlayers-ne $null) { 
		#Parse the FileName back into the .NET datetime object
		$ts = ((Dir -file $ServerFolder).name[-1])
		#Get-ARKDataFileDate
		$latestpayload = get-date -year $ts.split("-")[0] -month $ts.split("-")[1] -day $ts.split("-")[2] -hour $ts.split("-")[3] -minute $ts.split("-")[4] -second $ts.split("-")[5].split(".")[0]
		#Current server time
		$Servertime = (convertfrom-json (gc ($Serverfolder + "\" + (Dir $ServerFolder | Sort CreationTime -Descending | Select Name -First 1).name))).rules.daytime_s
		#Parse hour and minute
		$hour = $Servertime.split(":")[0].tostring()
		$minute = $Servertime.split(":")[1].tostring()
		#Gametime is 28 minutes to an RL minute, so our time is at least 28 minutes late. 
		$compensatetime = (28 + 28 )
		#Take servertime and recombine with compensatetime to try to be accurate.
		$Servertimeoutput = (get-date -hour $hour -minute $minute).AddMinutes($compensatetime)
		#Time to midday calculations
		$midday = get-date -hour 12 -minute 00 -day ($Servertimeoutput.day + 1 )
		$timetomidday = new-timespan -start $Servertimeoutput -end $midday
		$ttmd = ($timetomidday.hours * 60 + $timetomidday.Minutes)/28
		#Time to night calculations
		$night = get-date -hour 21 -minute 50 -day ($Servertimeoutput.day +  1)
		$timetonight = new-timespan -start $Servertimeoutput -end $night
		$ttmn = ($timetonight.hours * 60 + $timetonight.Minutes)/28
		#Time to morning calculationsb
		$morning = get-date -hour 5 -minute 15 -day ($Servertimeoutput.day + 1)
		$timetomorning = new-timespan -start $Servertimeoutput -end $morning
		$ingametimetomorning = ( $timetomorning.hours.tostring() + ":" + $timetomorning.minutes)
		$ttmm = ($timetomorning.hours * 60 + $timetomorning.Minutes)/28
		#$middlepartttm  minutes until tomorrow morning.
		#$playerspart = Table of Steam name, ARK name, Tribe name, TimeF goes here
		$playerspart = $ARKDataPlayers | sort "TribeName" | select "SteamName", "ARKName", "TribeName", @{N='Time Played'; E={$_.TimeF}} | ConvertTo-Html -fragment 
		#$middlepart2 Tribe data gathered lovingly by humans from ingame chat.
		#Count of tribes by number of players online
		$Tribespart = ($ARKDataPlayers)."TribeName" | Group-Object | sort "count" -descending | select "count", "name" | ConvertTo-Html -fragment | out-string | Add-HTMLTableAttribute  -AttributeName 'class' -Value 'sortable'

	}; #end if ARKDataPlayers
	#24h player count
	$playercount = $ARKDataPlayers.TimeF.Count

	#Had to move these beow the End If to get the player count in the title. 
	$playerslast24h = Get-ARKDataPlayersLastDay $ServerName | where { $_."Last Session Ended" -gt (get-date).addhours(-24)}
	$playerslast24w = $playerslast24h | sort "Last Session Ended" -descending | ConvertTo-Html -Fragment
	$playercount24h = $playerslast24h.Count

	#Load the serverlog if you made one
	$Serverlogpath = "$ARKDataDataDir\assets\$ServerName.txt"
	$Serverlog = "string"
	
	if (Test-Path $Serverlogpath) { 
		$Serverlog = import-csv $Serverlogpath  | select "Server Log (Manually updated)" | ConvertTo-Html -Fragment
	} else {
		$Serverlog = ""
	}; #end if Test-Path
	#Create page title (Player count and ServerName)
	if ($playercount) {
		$title = $playercount.tostring() + " playing on " + $ServerName 
	} else {
		$title = "0 playing on " + $ServerName 
	}; #end if playercount

	#Webpage Stamping
	$webdir = "$ARKDataWebDir\$ServerName.html" 
	$toppart > $webdir #Top down to webpage title
	$title >> $webdir #ServerName as webpage title 
	$gilgabanner >> $webdir #Gilgamech Technologies banner
	<#
	$subbannersubpage >> $webdir
	$Subtitle >> $webdir #Title down to "$ServerName"
	$Serversubpage  >> $webdir #Latest report: 
	$ServerName >> $webdir #ServerName
	$MapNamePart >> $webdir #Map Name:
	$MapName >> $webdir #MapName
	$ServerNamepart >> $webdir #Post ServerName tags
	#>
	if ($ARKDataPlayers -ne $null) { 
		<#
		$dateendpart = (get-date) # ----------------------------------------------> End timestamp
		($dateendpart  | select datetime | ConvertTo-Html -fragment)[3] >> $webdir #Report Datestamp
		$middlepartone >> $webdir #Newest data payload
		($latestpayload  | select datetime | ConvertTo-Html -fragment)[3] >> $webdir #Payload datestamp
		$middlepartreporttime >> $webdir #Current ingame time is approx
		$Servertimeoutput.ToString("HH:mm")  >> $webdir #Server ingame time
		$middlepartservertimenoon >> $webdir #Report took: 
		($dateendpart - $datestartpart).seconds  >> $webdir #Report took this many seconds
		$middlepartservertimenight >> $webdir #seconds to generate
		[math]::truncate($ttmd) >> $webdir #TTMD Time to midday
		$middlepartreport >> $webdir #minutes until The Midday Sound
		[math]::truncate($ttmn) >> $webdir #TTMN Time to nighttime
		$middlepartservertimemorning >> $webdir #minutes until nighttime
		[math]::truncate($ttmm) >> $webdir #TTMM Time to morning
		$middlepartttm >> $webdir #minutes until tomorrow morning. 28 min...1440 etc.
		$playerspart >> $webdir #Players online
		$middlepart2 >> $webdir #Tribe data gathered lovingly...
		$Tribespart >> $webdir #Count of tribes online
		$middlepartplayercount >> $webdir #Player count:
		#>
		$playercount >> $webdir #Count of ARKDataPlayers
		$middlepart5m >> $webdir #""$($player.name) ???" means never seen...
		<#
		#>
		$playerslast24w >> $webdir #Players seen last 24h by session ended date
		$middlepart24h >> $webdir #Players seen:
		$playercount24h >> $webdir #Count of Players seen last 24h
		$playerserver >> $webdir #Players seen closing tag
	} else {
		#Sleeping output is very cacheable.
		"<h2>Nobody's playing right now,<br> so ARKData is sleeping.</h2>" >> $webdir
	}; #end ???

	if ($Serverlog -ne "") {
		$Serverlog >> $webdir #Manual serverlog text file
	}; #end if Serverlog
	$tailpart >> $webdir #Footer - Website errors...down to ad.
}; #end Out-ARKDataWebpage

# endregion
*/
