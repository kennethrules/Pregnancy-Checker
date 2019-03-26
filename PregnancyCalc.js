
    function btnCalculate_onclick() 
    {
        var arrMonthsSmall = new Array(4,6,9,11);
        var arrMonthsBig = new Array(1,3,5,7,8,10,12);
        
        var theDay = document.getElementById("cboDay").value;
        var theMonth = document.getElementById("cboMonth").value;
        var theYear = document.getElementById("cboYear").value;
        
        var godinata = parseInt(theYear);
        var bosGodina = ((godinata/4)==parseInt(godinata/4));
        
        var malMesec = false;
        for(k=0;k<arrMonthsSmall.length;k++)
        {
            if(theMonth==arrMonthsSmall[k])
            {
                malMesec = true;
                break;
            }
        }
        
        //validate first
        
        if(funValidateDateSelection(theDay,theMonth,theYear,bosGodina,malMesec)){
            funCalculate(theDay,theMonth,theYear,bosGodina,malMesec);
            return true;
        }
        else{
            alert("Please select valid Date.");
            return false;
        }
    }

    function funValidateDateSelection(_day, _month, _year, bosGodina, malMesec)
    {
        if(_day==0 || _month==0 || _year==0 ){
            return false;
        }
        
        if(_month==2)
        {
            if((_day<29 && !bosGodina)||(_day==29 && bosGodina)) {
                return true;}
            else{
                return false;}
        }
        else
        {
            if(malMesec && _day>30){
                return false;}
            else{
                return true;}
        }
    }
    
    function funCalculate(_theDay,_theMonth,_theYear, _bosGodina, _malMesec)
    {
        var _datum = new Date();
        var _denot = _datum.getDate();
        var _mesecot = _datum.getMonth()+1;
        var _godinata = _datum.getFullYear();
        
        var txtConc = document.getElementById("txtConception");
        var txtPreg = document.getElementById("txtPregnancy");
        
        var _arrMonthsSmall = new Array(4,6,9,11); 
        var _arrMonthsBig = new Array(1,3,5,7,8,10,12);
        
    //calculate conception date
        var _concDay = parseInt(_theDay) + 14;
        var _concMonth = 0;
        var _concYear = _theYear;
        
        if(_concDay>28 && _theMonth==2){
            if(!_bosGodina){
                _concMonth = 3;
                _concDay = _concDay - 28;
            }
            else{
                if(_concDay==29){
                    _concMonth = 2;
                }
                else{
                    _concMonth = 3;
                    _concDay = _concDay - 29;
                }
            }
        }
        else if(_concDay>30 && _malMesec){
            _concMonth = parseInt(_theMonth) + 1;
            _concDay = _concDay - 30;
        }
        else if(_concDay>31 && !_malMesec){
            _concMonth = parseInt(_theMonth) + 1;
            _concDay = _concDay - 31;
        }
        else{
            _concMonth = _theMonth;
        }
        
        if(_concMonth>12){
            _concYear = parseInt(_theYear) + 1;
            _concMonth = parseInt(_concMonth) - 12;
        }
        
        txtConc.innerHTML = _concDay + " / " + _concMonth + " / " + _concYear;
        
    //Calculate pregnency estimate 
        var _TotalDays = 0;
        var _RefMonth = 0;
        var _RefMonthEnd = 0;
        
        for(k=_theYear; k<=_godinata; k++)
        {
            var _bosgodina = parseInt(k);
            var _RefBosGodina = ((_bosgodina/4)==parseInt(_bosgodina/4))
            
            if(k==_theYear && k==_godinata){
                _RefMonth = parseInt(_theMonth);
                _RefMonthEnd = parseInt(_mesecot)+1;
            }
            else if(k==_theYear){
                _RefMonth = parseInt(_theMonth);
                _RefMonthEnd = 13;
            }
            else if(k==_godinata){
                _RefMonth = 1;
                _RefMonthEnd = parseInt(_mesecot)+1;
            }
            else{
                _RefMonth = 1;
                _RefMonthEnd = 13;
            }
            
            for(i=_RefMonth; i<_RefMonthEnd; i++)
            {
                var _RefMalMesec = false;
                for(m=0;m<_arrMonthsSmall.length;m++)
                {
                    if(i==_arrMonthsSmall[m])
                    {
                        _RefMalMesec = true;
                        break;
                    }
                }
                
                var _maxMonth = 0;
                if (i==2 && _RefBosGodina){
                    _maxMonth = 29;
                }
                else if (i==2 && !_RefBosGodina){
                    _maxMonth = 28;
                }
                else if (_RefMalMesec){
                    _maxMonth = 30;}
                else{
                _maxMonth = 31;}
                
                if(i==_mesecot && k==_godinata){
                    var intTmp = 0; 
                    if(_mesecot==_theMonth && _godinata==_theYear){
                        intTmp = parseInt(_denot)- parseInt(_theDay);
                    }
                    else{
                        intTmp = parseInt(_denot);
                    }
                    
                    if(intTmp<0){
                        intTmp = 0;
                    }
                    _TotalDays += intTmp;
                }
                else if(i==_theMonth && k==_theYear){
                    _TotalDays += (parseInt(_maxMonth) - parseInt(_theDay));
                }
                else{
                    _TotalDays += parseInt(_maxMonth);
                }
            }
        }
        
        _TotalDays = _TotalDays - 1;
        txtPreg.innerHTML = parseInt(_TotalDays/7) + " weeks " + (_TotalDays - parseInt(_TotalDays/7)*7) + " days";
        
    }