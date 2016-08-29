
var sitUrl = 'http://eqs.autostreets.com';
var imgUrl = 'http://images.autostreets.com/';
var vehicleId = sessionStorage.vehicleId ? sessionStorage.vehicleId : '';
var userId = sessionStorage.appraiserId ? sessionStorage.appraiserId : '';
// var vehicleId = 6043;
// var vehicleId = 63342;
// var userId = 153;
// var userId = 155;
// var vehicleId = 33389;

var dataUrl = []
var eqs = {};
var len_leakage;
eqs.customerNeeds = sitUrl + '/m/eqs/getCustomerNeeds';
eqs.outwardCheck = sitUrl + '/m/eqs/getAppearanceParam';
eqs.outwardCheckItem = sitUrl + '/m/eqs/getAppearance';
eqs.getCheckItemCollect = sitUrl + '/m/eqs/getCheckItemCollect';
eqs.getBi = sitUrl + '/m/usereqs/bi';
eqs.getConditionParam = sitUrl + '/m/eqs/getConditionParam';
eqs.getCondition = sitUrl + '/m/eqs/getCondition';
eqs.getBaseInfo = sitUrl + '/m/eqs/getBaseInfo';
eqs.getPhotoStars = sitUrl + '/m/eqs/getPhotoStars';
eqs.getVehicleAccessory = sitUrl + '/m/eqs/getVehicleAccessory';
eqs.getCustomerNeed = sitUrl + '/m/eqs/getCustomerNeed';
eqs.getInteriorParam = sitUrl + '/m/eqs/getInteriorParam';
eqs.getInterior = sitUrl + '/m/eqs/getInterior';
eqs.getFrameParam = sitUrl + '/m/eqs/getFrameParam';
eqs.getFrame = sitUrl + '/m/eqs/getFrame';
eqs.getCheckResult = sitUrl + '/m/eqs/getCheckResult';

function eqs_api() {
    var t = this;
    var fn = arguments[0];
    var requireUrl = arguments[1] ? (t + createParame.call(arguments[1])) : t;

    function createParame() {
        var p = '?';
        for (var i in this) {
            p += '&' + i + '=' + this[i] + '';
        }
        return p;
    }

    $.ajax({
        type: "GET",
        url: requireUrl,
        dataType: "jsonp",
        jsonp: 'jsoncallback',
        async:false,
        success: function (data) {
            fn(data);
        }
    });
}

/*外观检测项目列表*/
function outwardCheck(){
    eqs_api.call(
        eqs.outwardCheck,
        getAppearanceParam
    )
}
var damageStatus_1 = []
var damageStatus_2 = []
var damageStatus_3 = []
var getAppearanceParam = function(data){
    var result = data.data;
    console.log(result)
    damageStatus_1 = result.damage_status_appearance_1;
    damageStatus_2 = result.damage_status_appearance_2;
    damageStatus_3 = result.damage_status_appearance_3;

    if(vehicleId){
        outwardCheck_item()
    }else{
        var cpObj = $('#checked_point')
        var harmObj = $('.harm_list')
        var cpHtml = harmHtml = ''
        $.each(result.checkItem,function(i,item){
            cpHtml += '<li id="'+item.id+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" data-damageStatusOption="'+item.damageStatusOption+'" style="left:'+item.axisx/150+'rem;top:'+item.axisy/150+'rem;">'+item.itemOrder+'</li>'
            harmHtml += '<li id="'+item.id+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" data-damageStatusOption="'+item.damageStatusOption+'"><div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt"></p></div><span>是</span><i></i></li>'
        })
        cpObj.append(cpHtml)
        harmObj.append(harmHtml)
    }
}

/*外观检测损伤列表*/
function outwardCheck_item(){
    eqs_api.call(
        eqs.outwardCheckItem,
        getAppearance,
        {vehicleId : vehicleId}
    )
}
var getAppearance = function(data){
    var result = data.data;
    console.log(result)
    var cpObj = $('#checked_point')
    var harmObj = $('.harm_list')
    var cpHtml = harmHtml = ''
    $.each(result,function(i,item){
        var damageLevelSelected = item.damageLevelSelected ? item.damageLevelSelected : ''
        var damageStatusSelected = item.damageStatusSelected ? item.damageStatusSelected : ''
        var _good,_list,_cur,_photo
        if(item.good){
            _good = '是'
            _cur = ''
            _photo = ''
            _list = '<div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt"></p></div><span>'+_good+'</span>'
        }else{
            _good = '否'
            _cur = 'class="cur"'
            _photo = imgUrl + item.photoUrl
            _list = '<div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt">'+damageLevelSelected + '-' +damageStatusSelected+'</p></div><span class="non">'+_good+'</span>'
        }
        cpHtml += '<li id="'+item.itemConfigId+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" data-damageStatusOption="'+item.damageStatusOption+'" data-damageLevelSelected="'+item.damageLevelSelected+'" data-damageStatusSelected="'+item.damageStatusSelected+'" data-photoUrl="'+ _photo +'" style="left:'+item.axisx/150+'rem;top:'+item.axisy/150+'rem;"'+_cur+'>'+item.itemOrder+'</li>'
        harmHtml += '<li id="'+item.itemConfigId+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" data-damageStatusOption="'+item.damageStatusOption+'" data-damageLevelSelected="'+item.damageLevelSelected+'" data-damageStatusSelected="'+item.damageStatusSelected+'" data-photoUrl="'+ _photo +'">'+_list+'<i></i></li>'
    })
    cpObj.append(cpHtml)
    harmObj.append(harmHtml)
}

/*获取附件信息*/
function vehicleAccessory(){
    eqs_api.call(
        eqs.getVehicleAccessory,
        getVehicleAccessory,
        { vehicleId : vehicleId }
    )
}
var getVehicleAccessory = function(data){
    var result = data.data;
    //console.log(result)
    if(result){
        var html = ''
        result.usingModel ? html += '<li><label>使用性质</label><p>'+result.usingModel+'</p></li>' : html += '<li><label>使用性质</label><p class="undefined">未填写</p></li>';
        if(result.purchaseTaxProof != null){
            var purchaseTaxProof = result.purchaseTaxProof ? '有' : '无' 
            html += '<li><label>购置附加税完税证明</label><p>'+purchaseTaxProof+'</p></li>'
        }else{
            html += '<li><label>购置附加税完税证明</label><p class="undefined">未填写</p></li>'
        }
        if(result.propertyCertificate != null){
            var propertyCertificate = result.propertyCertificate ? '有' : '无' 
            html += '<li><label>是否有产证</label><p>'+propertyCertificate+'</p></li>'
        }else{
            html += '<li><label>是否有产证</label><p class="undefined">未填写</p></li>'
        }
        result.nextAnnualExamination ? html += '<li><label>年审有效期</label><p>'+result.nextAnnualExamination.substr(0,10)+'</p></li>' : html += '<li><label>年审有效期</label><p class="undefined">未填写</p></li>';
        result.nextCompulsoryInsurance ? html += '<li><label>交强险有效期</label><p>'+result.nextCompulsoryInsurance.substr(0,10)+'</p></li>' : html += '<li><label>交强险有效期</label><p class="undefined">未填写</p></li>';
        result.transferNumber ? html += '<li><label>过户次数</label><p>'+result.transferNumber+'</p></li>' : html += '<li><label>过户次数</label><p class="undefined">未填写</p></li>';
        result.annexKey != null ? html += '<li><label>钥匙数</label><p>'+result.annexKey+'把</p></li>' : html += '<li><label>钥匙数</label><p class="undefined">未填写</p></li>';
        result.accessoryRemark ? html += '<li><label>备注</label><p class="bz">'+result.accessoryRemark+'</p></li>' : html += ''
        if(result.accessoryList){
            $.each(result.accessoryList,function(i,item){
                html += '<li><label>'+item.accessoryName+'</label><p>'+item.optionSelected+'</p></li>'
            })
        }else{
            $.each(result.nameList,function(i,item){
                html += '<li><label>'+item+'</label><p>未见</p></li>'
            })
        }
        $('#attachment_info').empty().append(html)
        $('#attachment_info li').each(function(){
            var _val = $(this).children('p').text()
            if( _val == 'null' || _val == 'undefined' || _val == null || _val == undefined){
                $(this).children('p').text('')
            }
        })
    }
    secHandCheck()
}

/*获取车辆照片*/
function photoStars(){
    eqs_api.call(
        eqs.getPhotoStars,
        getPhotoStars,
        { vehicleId : vehicleId }
    )
}
var getPhotoStars = function(data){
    var result = data.data;
    //console.log(result)
    if(result){
        var html = ''
        $.each(result,function(i,item){
            html += '<li><img id="'+item.configId+'" src="'+ imgUrl + item.photoUrl+'" /></li>'
        })
        $('.cpic_list').empty().append(html)
    }
    vehicleAccessory()
}

/*删除上传状态*/
function checkResult(){
    eqs_api.call(
        eqs.getCheckResult,
        getCheckResult,
        { vehicleId : vehicleId }
    )
}
var getCheckResult = function(data){
    var result = data.data;
    if(result){
        if(!result.del)$('.detele').removeClass('green')
        if(!result.upload)$('.form').removeClass('green')
    }
}

/*获取基本信息*/
function baseInfo(){
    eqs_api.call(
        eqs.getBaseInfo,
        getBaseInfo,
        { vehicleId : vehicleId }
    )
}
var getBaseInfo = function(data){
    checkResult()
    var result = data.data;
    console.log(result)
    if(result){
        switch(result.auditedStatus){
            case 0:
                $('.state').show()
                break;
            case 1:
                $('.state2').show()
                $('.edit').addClass('gley')
                break;
            case 2:
                if(result.handle == null || result.handle == undefined){
                    $('.state3').show().children('p').text('失败原因:暂无')
                }else{
                    $('.state3').show().children('p').text('失败原因:' + result.handle)
                }
                break;
            case 3:
                $('.state3').show().children('p').text('失败原因:vin码重复')
                break;
            case 99:
                $('.state4').show()
        }
        var conObj = $('.car_content')
        var selledName = result.selledName ? result.selledName : '';
        var score;
        if(parseInt(result.score) == 0){
            score = 0
        }else if(result.score != ''){
            score = result.score;
        }else{
            score = 100
        }
        
        var grade = result.grade ? result.grade : 'A';
        var code = result.code ? result.code : ''
        var licenseCode = result.licenseCode ? result.licenseCode : ''
        var registerLicenseYears = result.registerLicenseYears ? result.registerLicenseYears : ''
        var vehicleLicenseUrl = result.vehicleLicenseUrl ? result.vehicleLicenseUrl : ''
        var brand = result.brand ? result.brand : ''

        conObj.children('h4').text(brand + ' ' + selledName)
        conObj.children('.rank').text(score + grade)
        switch(grade){
            case 'A':
                conObj.children('.rank').addClass('high')
                break;
            case 'B':
                conObj.children('.rank').addClass('top')
                break;
            case 'C':
                conObj.children('.rank').addClass('middle')
                break;
            case 'D':
                conObj.children('.rank').addClass('low')
                break;
        }
        $('#car_code').text(code)
        $('#licenseCode,#licenseCode2').text(licenseCode)
        $('#registerLicenseYears,#registerLicenseYears2').text(registerLicenseYears)
        if(result.vehicleLicenseUrl){
            $('.base_info').attr('src',imgUrl + result.vehicleLicenseUrl)
        }else{
            $('.base_info').remove()
        }

        $('#vehicleModel').text(brand + ' ' + selledName)
        if(result.clearDisplayMileage == false){
            $('#displayMileage').text('无法显示')
        }else{
            if(result.displayMileage || parseInt(result.displayMileage) == 0){
                $('#displayMileage').text(result.displayMileage+'公里')
            }else{
                $('#displayMileage').text('未填写').addClass('undefined')
            }
        }
        $('#producedYear').text(result.producedYears)
        $('#engineCode').text(result.engineCode)
        result.sweptVolume ?  $('#sweptVolume').text(result.sweptVolume.toFixed(1)+result.sweptVolumeType) : $('#sweptVolume').text('')
        $('#oilType').text(result.oilType)
        if(result.registerCity == null){
            $('#registerCity').addClass('undefined').text('未填写')
        }else{
            $('#registerCity').text(result.registerProvince+result.registerCity)
        }
        if(result.currentProvince == null){
            $('#currentProvince').addClass('undefined').text('未填写')
        }else{
            $('#currentProvince').text(result.currentProvince+result.currentCity)
        }
        $('#transmissionType').text(result.transmissionType)
        $('#bodyColor').text(result.bodyColor)
        if(result.power == null){
            $('#power').addClass('undefined').text('未填写')
        }else{
            $('#power').text(result.power+'kw')
        }
        
        $('#vinCode').text(result.vinCode)
        if(result.featureItemList){
            var html = ''
            $.each(result.featureItemList,function(i,item){
                html += '<li>'+item+'</li>'
            })
            $('.base_config').empty().append(html)
        }
        if(result.personalFeatureItemList){
            var html2 = ''
            $.each(result.personalFeatureItemList,function(i,item){
                html2 += '<li>'+item+'</li>'
            })
            $('.personal_config').empty().append(html2)
        }
        
        $('#base_info li').each(function(){
            var _txt = $(this).children('p').text()
            console.log(_txt)
            if(_txt == '' || _txt == 'null' || _txt == 'undefined' || _txt == null || _txt == undefined || _txt == ' '){
                $(this).children('p').addClass('undefined').text('未填写')
            }
        })
        if(result.checkitemScoreList){
            $.each(result.checkitemScoreList,function(i,item){
                if(item.categoryName == '车身外观'){
                    $('#outside_score').text(item.score)
                }else if(item.categoryName == '驾驶舱'){
                    $('#inside_score').text(item.score)
                }
            })
        }
    }
    photoStars()
}

/*二手车车况检测*/
function secHandCondition(){
    eqs_api.call(
        eqs.getCondition,
        secHandGetCondition,
        { vehicleId : vehicleId }
    )
}
var secHandGetCondition = function(data){
    var result = data.data;
    //console.log(result)
    if(result){
        var html = ''
        $.each(result,function(i,item){
            //console.log(item.itemDesc)
            var _good;
            if(item.good == false){
                _good = '否'
            }else if(item.good == null){
                _good = '无'
            }
            if(!item.good)html += '<li><p>'+item.itemDesc+'</p><span>'+_good+'</span></li>'
        })
        $('.state_list').append(html)
    }
    customerNeed()
}

/*车况信息*/
function condition(){
    eqs_api.call(
        eqs.getCondition,
        getCondition,
        { vehicleId : vehicleId }
    )
}
var getCondition = function(data){
    var result = data.data;
    var titleHtml = ''
    if(result){
        $.each(item_obj,function(i,item){
            var checkHtml = ''
            var checkHtml2 = ''
            var checkHtml_obj
            var checkHtml2_obj
            if(item_obj[i].key == 10){
                $.each(result,function(k,item2){
                    console.log(item2)
                    if(item2.subCategory == item_obj[i].key){
                        titleHtml = '<div class="car_title"><h3 id="item_'+i+'">'+item_obj[i].val+'</h3></div>'
                        checkHtml_obj = '<ul class="other">'
                        checkHtml += '<li id="'+item2.itemConfigId+'"><span>'+item2.itemDesc+'</span><div class="other_radio"><input type="radio" name="'+item2.itemConfigId+'" value="yes" checked><label>是</label><input type="radio" name="'+item2.itemConfigId+'" value="no"><label>否</label><input type="radio" name="'+item2.itemConfigId+'" value="null"><label>无</label></div></li>'
                    }
                })
                checkHtml_obj += checkHtml + '</ul>'
                $('.state_check').append(titleHtml + checkHtml_obj)
            }else{
                $.each(result,function(k,item2){
                    console.log(item2)
                    if(item2.subCategory == item_obj[i].key){

                        titleHtml = '<div class="car_title"><h3 id="item_'+i+'">'+item_obj[i].val+'</h3></div>'
                        checkHtml2_obj = '<ul class="driver">'
                        var leakage;
                        if(item2.showDamageLevel){
                            leakage = '<ul class="leak">'
                            for(var j=1;j<len_leakage+1;j++){
                                leakage += '<li>'+j+'个渗漏点'+'</li>'
                            }
                            leakage += '</ul>'
                        }else{
                            leakage = ''
                        }
                        checkHtml2 += '<li id="'+item2.itemConfigId+'"><span>'+item2.itemDesc+'</span><div class="other_radio"><input type="radio" name="'+item2.itemConfigId+'" value="yes" checked><label>是</label><input type="radio" name="'+item2.itemConfigId+'" value="no"><label>否</label></div>'+leakage+'</li>'
                    }
                }) 
                if(checkHtml2){
                    checkHtml2_obj += checkHtml2 + '</ul>'
                    //console.log(checkHtml2)
                    $('.state_check').append(titleHtml + checkHtml2_obj)
                }
                
            }
        })

        $.each(result,function(i,item){
            $('.driver li').each(function(){
                if($(this).attr('id') == item.itemConfigId){
                    if(!item.good){
                        $(this).children().children('input').eq(1).attr('checked',true)
                        if(item.damageLevelSelected){
                            $(this).data('damageLevelSelected',item.damageLevelSelected)
                            $(this).children('span').append('<i>('+item.damageLevelSelected+')</i>')
                        }
                        if($(this).children('span').text() == '发动机机油是否无冷却液混入' || $(this).children('span').text() == '车内是否无水泡痕迹'){
                            $(this).addClass('cur')
                        }
                    }else{

                    }
                    
                }
            })
            $('.other li').each(function(){
                if($(this).attr('id') == item.itemConfigId){
                    if(item.good == false){
                        $(this).children().children('input').eq(1).attr('checked',true)
                    }else if(item.good == null){
                        $(this).children().children('input').eq(2).attr('checked',true)
                    }
                }
            })
        })
    }
    $('.leak li').on('click',function(){
        var _val = $(this).text()
        $(this).parent().parent().attr('data-damagelevelleakage',_val)
        $(this).parent().parent().children('span').find('i').remove()
        $(this).parent().parent().children('span').append('<i>('+_val+')</i>')
        $(this).parent().parent().attr('data-state',1)
        $(this).parent().hide()
        $('.leak,.tipbg').hide()
    })
}

/*车况项目列表*/
function conditionParam(){
    eqs_api.call(
        eqs.getConditionParam,
        getConditionParam
    )
}

var item_obj = []
var getConditionParam = function(data){
    var result = data.data;
    var titleHtml = ''
    var itemHtml = ''
    var checkHtml;
    for(var i in result.item){
        item_obj.push({
            key : i,
            val : result.item[i]
        })
    }
    len_leakage = result.damage_level_leakage.length
    if(!vehicleId){
        $.each(result.item,function(i,item){
            console.log(result)
            if(i==10){
                titleHtml += '<div class="car_title"><h3 id="item_'+i+'">'+item+'</h3></div>'
                checkHtml = '<ul class="other">'
                $.each(result.checkItem,function(j,item2){
                    if(item2.subCategory == i){
                        checkHtml += '<li id="'+item2.id+'"><span>'+item2.itemDesc+'</span><div class="other_radio"><input type="radio" name="'+item2.id+'" value="yes" checked><label>是</label><input type="radio" name="'+item2.id+'" value="no"><label>否</label><input type="radio" name="'+item2.id+'" value="null"><label>无</label></div></li>'
                    }
                })
                checkHtml += '</ul>'
                titleHtml += checkHtml
            }else{
                titleHtml += '<div class="car_title"><h3 id="item_'+i+'">'+item+'</h3></div>'
                checkHtml = '<ul class="driver">'
                $.each(result.checkItem,function(j,item2){
                    if(item2.subCategory == i){
                        var leakage;
                        if(item2.showDamageLevel){
                            leakage = '<ul class="leak">'
                            
                            for(var j=0;j<len_leakage;j++){
                                leakage += '<li>'+result.damage_level_leakage[j]+'</li>'
                            }
                            leakage += '</ul>'
                        }else{
                            leakage = ''
                        }
                        checkHtml += '<li id="'+item2.id+'"><span>'+item2.itemDesc+'</span><div class="other_radio"><input type="radio" name="'+item2.id+'" value="yes" checked><label>是</label><input type="radio" name="'+item2.id+'" value="no"><label>否</label></div>'+leakage+'</li>'
                    }
                })
                checkHtml += '</ul>'
                titleHtml += checkHtml
            }
        })
        $('.state_check').append(titleHtml)
    }else{
        condition()
    }

    $('.driver').each(function(){
        if($(this).text() == ''){
            $(this).prev().remove()
            $(this).remove()
        }
    })
    $('.leak li').on('click',function(){
        var _val = $(this).text()
        $(this).parent().parent().attr('data-damagelevelleakage',_val)
        $(this).parent().parent().children('span').find('i').remove()
        $(this).parent().parent().children('span').append('<i>('+_val+')</i>')
        $(this).parent().parent().attr('data-state',1)
        $(this).parent().hide()
        $('.leak,.tipbg').hide()
    })
}

/*检测信息统计*/
function bi(){
    eqs_api.call(
        eqs.getBi,
        getBi,
        {userId : userId}
    )
}
var getBi = function(data){
    var result = data.data;
    var _userInfo,str = sessionStorage.userInfo;
    _userInfo = JSON.parse(str)
    var obj = $('.pc_top')
    obj.children('h3').text(_userInfo.name)
    obj.children('p').text(_userInfo.orgName)
    _userInfo.headInco ? obj.children('.head').children('img').attr('src',imgUrl + _userInfo.headInco) : obj.children('.head').children('img').attr('src','http://img.autostreetscdn.com/m/build/1.00/images/eqs/head.png')
    if(result){
        $('#this_month').text(result.thisMonthAuditedVehicle)
        $('#last_month').text(result.lastMonthAuditedVehicle)
        $('#this_season').text(result.thisSeasonAuditedVehicle)
    }
}

/*损伤描述汇总*/
function checkItemCollect(){
    eqs_api.call(
        eqs.getCheckItemCollect,
        getCheckItemCollect,
        {vehicleId : vehicleId}
    )
}
var getCheckItemCollect = function(data){
    var result = data.data;
    var html = '';
    $.each(result,function(i,item){
        html += item + '；<br />'
    })
    $('#cic').empty().append(html)
}

/*骨架检测项目列表*/
function frameParam(){
    eqs_api.call(
        eqs.getFrameParam,
        getFrameParam,
        {vehicleId : vehicleId}
    )
}

var damageStatus_5;
var getFrameParam = function(data){
    var result = data.data;
    console.log(result)
    damageStatus_5 = result.damage_status_frame;
    if(vehicleId){
        frame()
    }else{
        var cpObj = $('#checked_point')
        var harmObj = $('.harm_list')
        var cpHtml = harmHtml = ''
        $.each(result.checkItem,function(i,item){
            cpHtml += '<li id="'+item.id+'"  data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" style="left:'+item.axisx/150+'rem;top:'+item.axisy/150+'rem;">'+item.itemOrder+'</li>'
            harmHtml += '<li id="'+item.id+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" ><div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt"></p></div><span>是</span><i></i></li>'
        })
        cpObj.append(cpHtml)
        harmObj.append(harmHtml)
    }
}

/*骨架损伤列表*/
function frame(){
    eqs_api.call(
        eqs.getFrame,
        getFrame,
        {vehicleId : vehicleId}
    )
}
var getFrame = function(data){
    var result = data.data;
    console.log(result)
    var cpObj = $('#checked_point')
    var harmObj = $('.harm_list')
    var cpHtml = harmHtml = ''
    $.each(result,function(i,item){
        var damageLevelSelected = item.damageLevelSelected ? item.damageLevelSelected : ''
        var damageStatusSelected = item.damageStatusSelected ? item.damageStatusSelected : ''
        var _good,_list,_cur,_photo
        if(item.good){
            _good = '是'
            _cur = ''
            _photo = ''
            _list = '<div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt"></p></div><span>'+_good+'</span>'
        }else{
            _good = '否'
            _cur = 'class="cur"'
            _photo = imgUrl + item.photoUrl
            _list = '<div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt">'+damageStatusSelected+'</p></div><span class="non">'+_good+'</span>'
        }
        cpHtml += '<li id="'+item.itemConfigId+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" data-damageStatusOption="'+item.damageStatusOption+'" data-damageLevelSelected="'+item.damageLevelSelected+'" data-damageStatusSelected="'+item.damageStatusSelected+'" data-photoUrl="'+ _photo +'" style="left:'+item.axisx/150+'rem;top:'+item.axisy/150+'rem;"'+_cur+'>'+item.itemOrder+'</li>'
        harmHtml += '<li id="'+item.itemConfigId+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" data-damageStatusOption="'+item.damageStatusOption+'" data-damageLevelSelected="'+item.damageLevelSelected+'" data-damageStatusSelected="'+item.damageStatusSelected+'" data-photoUrl="'+ _photo +'">'+_list+'<i></i></li>'
    })
    cpObj.append(cpHtml)
    harmObj.append(harmHtml)
}

/*内饰检测项目列表*/
function interiorParam(){
    eqs_api.call(
        eqs.getInteriorParam,
        getInteriorParam,
        {vehicleId : vehicleId}
    )
}

var damageStatus_4;
var getInteriorParam = function(data){
    var result = data.data;
    console.log(result)
    if(result){
        damageStatus_4 = result.damage_status_interior;

        if(vehicleId){
            interior_item()
        }else{
            var cpObj = $('#checked_point')
            var harmObj = $('.harm_list')
            var cpHtml = harmHtml = ''
            $.each(result.checkItem,function(i,item){
                cpHtml += '<li id="'+item.id+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" style="left:'+item.axisx/150+'rem;top:'+item.axisy/150+'rem;">'+item.itemOrder+'</li>'
                harmHtml += '<li id="'+item.id+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" ><div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt"></p></div><span>是</span><i></i></li>'
            })
            cpObj.append(cpHtml)
            harmObj.append(harmHtml)
        }
    }
}

/*内饰损伤列表*/
function interior_item(){
    eqs_api.call(
        eqs.getInterior,
        getInterior_item,
        {vehicleId : vehicleId}
    )
}
var getInterior_item = function(data){
    var result = data.data;
    console.log(result)
    var cpObj = $('#checked_point')
    var harmObj = $('.harm_list')
    var cpHtml = harmHtml = ''
    $.each(result,function(i,item){
        var damageLevelSelected = item.damageLevelSelected ? item.damageLevelSelected : ''
        var damageStatusSelected = item.damageStatusSelected ? item.damageStatusSelected : ''
        var _good,_list,_cur,_photo
        if(item.good){
            _good = '是'
            _cur = ''
            _photo = ''
            _list = '<div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt"></p></div><span>'+_good+'</span>'
        }else{
            _good = '否'
            _cur = 'class="cur"'
            _photo = imgUrl + item.photoUrl
            _list = '<div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt">'+damageStatusSelected+'</p></div><span class="non">'+_good+'</span>'
        }
        cpHtml += '<li id="'+item.itemConfigId+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" data-damageStatusOption="'+item.damageStatusOption+'" data-damageLevelSelected="'+item.damageLevelSelected+'" data-damageStatusSelected="'+item.damageStatusSelected+'" data-photoUrl="'+ _photo +'" style="left:'+item.axisx/150+'rem;top:'+item.axisy/150+'rem;"'+_cur+'>'+item.itemOrder+'</li>'
        harmHtml += '<li id="'+item.itemConfigId+'" data-showDamageStatus="'+item.showDamageStatus+'" data-showDamageLevel="'+item.showDamageLevel+'" data-damageStatusOption="'+item.damageStatusOption+'" data-damageLevelSelected="'+item.damageLevelSelected+'" data-damageStatusSelected="'+item.damageStatusSelected+'" data-photoUrl="'+ _photo +'">'+_list+'<i></i></li>'
    })
    cpObj.append(cpHtml)
    harmObj.append(harmHtml)
}

/*二手车骨架检测*/
function frame2(){
    eqs_api.call(
        eqs.getFrame,
        getFrame2,
        {vehicleId : vehicleId}
    )
}
var getFrame2 = function(data){
    var result = data.data;
    //console.log(result)
    if(result){
        var html = ''
        var html2 = ''
        $.each(result,function(i,item){
            var damageStatusSelected = item.damageStatusSelected ? item.damageStatusSelected : ''
            if(!item.good){
                html += '<li class="cur" style="left:'+item.axisx/150+'rem;top:'+item.axisy/150+'rem">'+item.itemOrder+'</li>'
                html2 += '<li id="'+item.itemConfigId+'" data-photoUrl="'+imgUrl+item.photoUrl+'"><div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt">'+damageStatusSelected+'</p></div><i></i></li>'
            }
        })
        $('#skeleton_checked_point').append(html)
        $('#skeleton_list').append(html2)
    }
    secHandCondition()
}

/*二手车内饰检测*/
function interior(){
    eqs_api.call(
        eqs.getInterior,
        getInterior,
        {vehicleId : vehicleId}
    )
}
var getInterior = function(data){
    var result = data.data;
    //console.log(result)
    if(result){
        var html = ''
        var html2 = ''
        $.each(result,function(i,item){
            var damageStatusSelected = item.damageStatusSelected ? item.damageStatusSelected : ''
            if(!item.good){
                html += '<li class="cur" style="left:'+item.axisx/150+'rem;top:'+item.axisy/150+'rem">'+item.itemOrder+'</li>'
                html2 += '<li id="'+item.itemConfigId+'" data-photoUrl="'+imgUrl+item.photoUrl+'"><div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt">'+damageStatusSelected+'</p></div><i></i></li>'
            }
        })
        $('#inside_checked_point').append(html)
        $('#inside_list').append(html2)
    }
    frame2()
}

/*二手车外观检测*/
function secHandCheck(){
    eqs_api.call(
        eqs.outwardCheckItem,
        secHandGetAppearance,
        {vehicleId : vehicleId}
    )
}
var secHandGetAppearance = function(data){
    var result = data.data;
    console.log(result)
    if(result){
        var html = ''
        var html2 = ''
        $.each(result,function(i,item){
            var damageLevelSelected = item.damageLevelSelected ? item.damageLevelSelected : ''
            var damageStatusSelected = item.damageStatusSelected ? item.damageStatusSelected : ''
            if(!item.good){
                html += '<li class="cur" style="left:'+item.axisx/150+'rem;top:'+item.axisy/150+'rem">'+item.itemOrder+'</li>'
                html2 += '<li id="'+item.itemConfigId+'" data-photoUrl="'+imgUrl+item.photoUrl+'"><div class="desribe"><p>'+item.itemOrder+'.'+item.itemDesc+'</p><p class="txt">'+damageLevelSelected+'-'+damageStatusSelected+'</p></div><i></i></li>'
            }
        })
        $('#checked_point').append(html)
        $('#outside_list').append(html2)
    }
    interior()
}



/*二手车客户需求信息*/
function customerNeed(){
    eqs_api.call(
        eqs.getCustomerNeed,
        getCustomerNeed,
        { vehicleId : vehicleId}
    )
}
var getCustomerNeed = function(data){
    var result = data.data;
    //console.log(result)
    if(result){
        $('#requirementType').text(result.requirementType)
        $('#vehicleDesc').text(result.vehicleDesc)
        if(result.startBidPrice || parseInt(result.startBidPrice) == 0){
            $('#startBidPrice').text(result.startBidPrice)
        }else{
            $('#startBidPrice').parent().hide()
        }
        if(result.reservePrice || parseInt(result.reservePrice) == 0){
            $('#reservePrice').text(result.reservePrice)
        }else{
            $('#reservePrice').parent().hide()
        }
        if(result.salePrice || parseInt(result.salePrice) == 0){
            $('#salePrice').text(result.salePrice)
        }else{
            $('#salePrice').parent().hide()
        }
        if(result.trafficViolationFines == null){
            $('#trafficViolationFines').parent().hide()
        }else{
            $('#trafficViolationFines').text(result.trafficViolationFines+'承担')
        }
        if(result.saleInsurance != null){
            var saleIns = result.saleInsurance ? '是' : '否'
            $('#saleInsurance').text(saleIns)
        }
        if(result.remark){
            $('#remark').text(result.remark)
        }else{
            $('#remark').parent().hide()
        }
        if(result.other){
            $('#other').text(result.other)
        }else{
            $('#other').parent().hide()
        }
        var html = ''
        $.each(result.otherPhotoList,function(i,item){
            html += '<li><img src="'+imgUrl+item.photoUrl+'"/></li>'
        })
        $('.need_pic').append(html)
        $('.need_list li').each(function(){
            var _val = $(this).children('span').text()
            var _val2 = $(this).children('p').text()
            if(_val == 'null' || _val == 'undefined' || _val == null || _val == undefined){
                $(this).children('span').text('')
            }
            if(_val2 == 'null' || _val == 'undefined' || _val == null || _val == undefined){
                $(this).children('p').text('')
            }
        })
    }
}

/*客户需要*/
function customerNeeds(){
    eqs_api.call(
        eqs.customerNeeds,
        getCustomerNeeds,
        { userId : userId}
    )
}
var locationPro_array = []
var locationCity_array = []
var orgChildId_array = []
var orgChildName_array = []
var getCustomerNeeds = function(data){
    var result = data.data;
    console.log(result)
    if(result){
        var provinceObj = $('#province').children('select')
        var organObj = $('#group_name').children('select')
        var requireObj = $('#sale_need').children('select')
        var vehicleObj = $('#car_nature').children('select')
        var locaHtml = '<option value="">请选择</option>'
        var groupHtml = '<option value="">请选择</option>'
        var requireHtml = '<option value="">请选择</option>'
        var vehicleHtml = ''

        if(result.location){
            $.each(result.location,function(i,item){
                locaHtml += '<option value="'+item.province+'">' + item.province + '</option>'
                locationPro_array.push(item.province)
                locationCity_array.push(item.cityList)
            })
        }
        if(result.organ){
            $.each(result.organ,function(i,item){
                groupHtml += '<option value="'+item.name+'" id="'+ item.orgId +'">' + item.name + '</option>'
                if(item.childrens){
                    var len = item.childrens.length
                    orgChildId_array[i] = []
                    orgChildName_array[i] = []
                    $.each(item.childrens,function(j,item2){
                        orgChildId_array[i][j] = item2.orgId
                        orgChildName_array[i][j] = item2.name
                    })
                }
            })
        }
        if(result.requirementType){
            $.each(result.requirementType,function(i,item){
                requireHtml += '<option value="'+item+'">' + item + '</option>'
            })
        }
        if(result.vehiclePpe){
            $.each(result.vehiclePpe,function(i,item){
                vehicleHtml += '<option value="'+item+'">' + item + '</option>'
            })
        }
        provinceObj.empty().append(locaHtml)
        organObj.append(groupHtml)
        requireObj.append(requireHtml)
        vehicleObj.append(vehicleHtml)
        
        var str = JSON.parse(sessionStorage.userInfo)
        var groupObj = $('#group_name').children('select').children('option')
        var len = groupObj.length
        for(var i=0;i<len;i++){
            if(groupObj[i].text == str.groupName){
                groupObj[i].selected = true;
                detail_shop(groupObj[i].index)
                break;
            }
        }
        var shopObj = $('#detail_shop').children('select').children('option')
        var len = shopObj.length
        for(var k=0;k<len;k++){
            if(shopObj[k].value == str.orgId){
                shopObj[k].selected = true;
            }
        }

        customerNeed2()
    }
}

/*客户需求信息*/
function customerNeed2(){
    eqs_api.call(
        eqs.getCustomerNeed,
        getCustomerNeed2,
        { vehicleId : vehicleId}
    )
}
var getCustomerNeed2 = function(data){
    var result = data.data;
    console.log(result)
    if(result){
        var groupObj = $('#group_name').children('select').children('option')
        var len = groupObj.length
        for(var i=0;i<len;i++){
            if(groupObj[i].text == result.orgName){
                groupObj[i].selected = true;
                detail_shop(groupObj[i].index)
                break;
            }
        }
        var shopObj = $('#detail_shop').children('select').children('option')
        var len = shopObj.length
        for(var k=0;k<len;k++){
            if(shopObj[k].value == result.vehicleSrcId){
                shopObj[k].selected = true;
            }
        }
        var _vehicleSrcType = result.vehicleSrcType
        if(_vehicleSrcType == 3){
            $('.group2').hide()
            $('.personal').show()
            $('#personal').attr('checked',true)
            var obj = $('.personal li')
            obj.eq(0).children('input').val(result.custName)
            obj.eq(1).children('input').val(result.custPhone)
            obj.eq(4).children('input').val(result.custAddress)

            var opt = obj.eq(2).children('select').children('option')
            var len = opt.length
            for(var i=0;i<len;i++){
                if(opt[i].text == result.custProvince){
                    opt[i].selected = true
                    province_selected(opt[i].text)
                    var cityObj = $('#city').children('select')
                    var len2 = cityObj.children('option').length
                    for(var k=0;k<len2;k++){
                        if(cityObj.children('option')[k].text == result.custCity){
                            cityObj.children('option')[k].selected = true
                            break;
                        }
                    }
                    break;
                }
            }
        }else{
            $('.group2').show()
            $('.personal').hide()
            $('#group').attr('checked',true)
            
            var natureObj = $('#car_nature').children('select').children('option')
            var len = natureObj.length
            for(var k=0;k<len;k++){
                if(natureObj[k].text == result.vehiclePpe){
                    natureObj[k].selected = true;
                }
            }
        }
        var snObj = $('#sale_need').children('select').children('option')
        var len = snObj.length
        for(var j=0;j<len;j++){
            if(snObj[j].text == result.requirementType){
                snObj[j].selected = true;
                sale_need_selected(snObj[j].text)
            }
        }
        if(result.startBidPrice || parseInt(result.startBidPrice) == 0)$('#start_pr').children('input').val(result.startBidPrice)
        if(result.reservePrice || parseInt(result.reservePrice) == 0)$('#bottom_pr').children('input').val(result.reservePrice)
        if(result.salePrice || parseInt(result.salePrice) == 0)$('#sale_pr').children('input').val(result.salePrice)
        if(result.trafficViolationFines){
            result.trafficViolationFines == '上家' ? $('#seller').addClass('cur').siblings().removeClass('cur') : $('#buyer').addClass('cur').siblings().removeClass('cur')
        }
        if(result.saleInsurance != null){
            result.saleInsurance == true ? $('#yes').addClass('cur').siblings().removeClass('cur') : $('#no').addClass('cur').siblings().removeClass('cur')
        }
        $('#remark').val(result.remark)
        $('#cic').text(result.vehicleDesc)
        $('#other_remark').val(result.other)

        var _photo = []
        if(result.otherPhotoList){
            $.each(result.otherPhotoList,function(i,item){
                _photo.push(item.photoUrl)
            })
            var len = _photo.length
            for(var i=1;i<len+1;i++){
                var obj = $('#need_photo'+i)
                obj.show().children('img').attr('src',imgUrl + _photo[i-1])
                if(i<3){$('#need_photo'+(i+1)).show()}
            }
        }
    }
}

/*弹出框*/
function popup(txt){
    $('.error_layer .error_txt').text(txt);
    $('.error_layer').show();
    $('.tipbg').show()
}

function popdown(){
    $('.error_layer').hide();
    $('.tipbg').hide()
}

function popup2(txt){
    $('.error_layer2 .error_txt').text(txt);
    $('.error_layer2').show();
    $('.tipbg').show()
}

function popdown2(){
    $('.error_layer2').hide();
    $('.tipbg').hide()
}

function sale_need_selected(_this){
    $('#start_pr,#start_pr i,#bottom_pr,#bottom_pr i,#sale_pr,#sale_pr i').hide();
    var _val = _this
    switch(_val){
        case '网上寄售':
            $('#start_pr,#bottom_pr,#sale_pr').show();
            break;
        case '展厅寄售': 
            $('#sale_pr,#sale_pr i').show();
            break;
        case '车道拍卖': 
            $('#start_pr,#bottom_pr,#start_pr i').show();
            break;
        case '网上有底价拍卖': 
            $('#start_pr,#bottom_pr,#start_pr i,#bottom_pr i').show();
            break;
        case '网上无底价拍卖': 
            $('#start_pr,#bottom_pr,#start_pr i').show();
            break;
        default:
            $('#start_pr,#bottom_pr').show();
    }
}

function province_selected(_this){
    var sele_prv = _this
    var cityHtml = '<option value="">请选择</option>'
    var cityObj = $('#city').children('select')
    $.each(locationPro_array,function(i,item){
        if(item == sele_prv){
            var result = locationCity_array[i]
            console.log(result)
            $.each(result,function(j,item2){
                cityHtml += '<option value="'+item2+'">' + item2 + '</option>'
            })
            return false;
        }
    })
    $('#city select').removeAttr('disabled')
    cityObj.empty().append(cityHtml)
}

function detail_shop(_this){
    var _index = _this
    var groupHtml = '<option value="">请选择</option>'
    var groupObj = $('#detail_shop').children('select')
    var len = orgChildId_array[_index-1].length
    for(var i=0;i<len;i++){
        groupHtml += '<option value="'+ orgChildId_array[_index-1][i] +'">' + orgChildName_array[_index-1][i] + '</option>'
    }
    $('#detail_shop select').removeAttr('disabled')
    groupObj.empty().append(groupHtml)
}

function common_popupWindow(/*p,*/ option) {
    function insertStyle(cssSrc) {
        var css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = cssSrc;
        document.head.appendChild(css)
    };
    function getLocationPopup() {
        /*  if (!p) {
         return
         }
         popup.insertStyle(p);*/
        var setting = option || {
                title: "默认标题",
                closeBtn: false,
                content: "描述文字。。。",
                btnYes: {text: "确定", url: "http://www.yhd.com"},
                btnNo: {text: "取消", url: "http://www.yhd.com"}
            };
        if (setting.closeBtn) {
            var closeBtn = '<b class="close"></b>';
        } else {
            var closeBtn = "";
        }
        if (setting.hasOwnProperty("title")) {
            var title = '<div class="title">' + setting.title + '</div>';
        } else {
            var title = "";
        }
        if (setting.hasOwnProperty("btnYes")) {
            var btnYes = '<a href="' + setting.btnYes.url + '" class="btn_public btnYes">' + setting.btnYes.text + "</a>"
        } else {
            var btnYes = ""
        }
        if (setting.hasOwnProperty("btnNo")) {
            var btnNo = '<a href="' + setting.btnNo.url + '" class="btn_public btnNo">' + setting.btnNo.text + "</a>"
        } else {
            var btnNo = ""
        }
        var pop = '<div class="popup_wrap">' + title + closeBtn + '<div class="text">' + setting.content + '</div><div class="btn_box">' + btnNo + btnYes + "</div></div>";
        var div = document.createElement("div");
        div.id = "popupTipsLocation";
        div.innerHTML = pop;
        document.body.appendChild(div);
        div.querySelector(".close") && close.addEventListener("click", function () {
            closePopup()
        }, false);
        var popupWrap = div.querySelector(".popup_wrap");
        var popupWrap = div.querySelector(".popup_wrap");
        /*popupWrap.addEventListener("click", function(e) {
         if (e.target === document.querySelector(".popup_wrap")) {
         closePopup();
         } else {
         e.stopPropagation()
         }
         }, false)*/
        div.querySelector(".btnNo") && div.querySelector(".btnNo").addEventListener("click", function () {
            closePopup();
        }, false);
        div.querySelector(".btnYes") && div.querySelector(".btnYes").addEventListener("click", function () {
            closePopup();
            if (setting.btnYes.callback) {
                (setting.btnYes.callback)();
            }
        }, false);

    };
    function closePopup() {
        var a = document.querySelector("#popupTipsLocation");
        a.parentNode.removeChild(a)
    };
    getLocationPopup();
};
function goBackConfirm(){
    common_popupWindow({
        content: "是否返回，填写的内容将不保存！",
        btnNo: {text: "取消", url: "javascript:void(0)"},
        btnYes: {
            text: "确定",
            url: "javascript:history.go(-1)"
        }
    })
}



if($('.back').length)document.querySelector('.back').addEventListener('click',goBackConfirm);

$(function(){
    var notice_flag = false;
    $('.harm_class h3').on('click',function(){
        $('p.harm_notice').css("top","70px").addClass('notice_show')
        $('.tipbg').show()
        notice_flag = true;
    })

    $('.tipbg').on('click',function(){
        if(notice_flag){
            $('p.harm_notice').css("top","-100%").removeClass('notice_show')
            $(this).hide()
        }
    })
})

function _form(itemConfigId,good,photoUrl,damageStatusSelected,damageLevelSelected){
    var pamaData = {};
    var itemList = [];
    var item = {
        itemConfigId : itemConfigId,
        photoUrl : photoUrl,
        good : good,
        damageStatusSelected : damageStatusSelected,
        damageLevelSelected : damageLevelSelected
    };
    itemList.push(item);

    pamaData.checkitemList = JSON.stringify(itemList);
    if (sessionStorage.vehicleId) {
        pamaData.vehicleId = sessionStorage.vehicleId;
    }
    if (sessionStorage.appraiserId) {
        pamaData.userId = sessionStorage.appraiserId;
    }
    var url = "m/eqs/saveCheckItems";
    console.log(item)
    $.mAjax({
        type: "POST",
        url: url,
        data: pamaData,
        success: function (data) {
            if (data.success) {
                sessionStorage.vehicleId = data.data;
                // 跳转页面
                // if(sessionStorage.status == 2) {
                //     location.href = sitUrl + "/html/sec_hand_check.html";
                // } else {
                //     location.href = sitUrl + "/html/add_car.html";
                // }
            } else {
                alert(data.msg);
            }
        }
    });
}

function list_height(){
    var _winHeight = $(window).height()
    return _winHeight - 40 - 32 - $('.driver_card').height() - $('.clear_data').height() - $('.detail_title').height()
}
