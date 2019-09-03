var consultor = require('../data/consultor');
var xml = require('../helpers/xml');
var appEnv = require('../environments/environment');

bar_inf01 = async (dateF, dateT, co_usuario_list) => {
    var fileName = "barinf01" + new Date().getTime();
    fileName += "_" + Math.round(Math.random() * 100) + ".xml";
    var inf = await consultor.Informe01_multi(dateF, dateT, co_usuario_list);
    var depurated = bar_inf01_depurated(inf);
    var readyForXML = await bar_inf01_readyForXML(depurated);
    try {
        var retval = await xml.write(fileName, readyForXML);
        return bar_inf01_embed_template(fileName);
    } catch (error) {
        console.log(error);
        return "";
    }
}

bar_inf01_embed_template = (fileName) => {
    return "<html><head></head><body>"
        + "<embed src='"+appEnv.url_prefix+"/file/FC_2_3_MSColumnLine_DY_2D.swf'"
        + " FlashVars='&dataURL="+appEnv.url_prefix+"/file/" + fileName + "&amp;chartWidth=600&amp;chartHeight=350'"
        + " quality='high' bgcolor='#FFFFFF' WIDTH='600' HEIGHT='350'"
        + ">"
        + "</embed></body></html>";
}

bar_inf01_depurated = (inf) => {
    var cleanData = [], sameResultCountData = [], periodos = [];
    var resultCount = 0, maxGananciaNeta = 0, sum_costo_fijo = 0, count_costo_fijo = 0;
    for (var i in inf) {
        if (inf[i].total.total != 0) cleanData.push(inf[i]);
        resultCount = Math.max(inf[i].results.length, resultCount);
    }
    for (var i in cleanData)
        if (cleanData[i].results.length == resultCount) {
            sameResultCountData.push({
                co_usuario: cleanData[i].co_usuario,
                no_usuario: cleanData[i].no_usuario,
                results: cleanData[i].results
            });
            for (var j in cleanData[i].results) {
                maxGananciaNeta = Math.max(cleanData[i].results[j].ganancia_neta, maxGananciaNeta);
                sum_costo_fijo += cleanData[i].results[j].costo_fijo;
                ++count_costo_fijo;
            }
        }
    if (sameResultCountData.length > 0) {
        for (var j in cleanData[0].results)
            periodos.push({
                aaaa: cleanData[0].results[j].aaaa,
                mm: cleanData[0].results[j].mm
            });
    }
    return {
        axismaxvalue: maxGananciaNeta,
        costofijopromedio: sum_costo_fijo / count_costo_fijo,
        periodos: periodos,
        results: sameResultCountData
    };
}

bar_inf01_readyForXML = async (inf) => {
    var category = [], dataset = [];
    for (var i in inf.periodos) {
        category.push({
            "@name": inf.periodos[i].aaaa + "-" + inf.periodos[i].mm,
            "@hoverText": inf.periodos[i].aaaa + "-" + inf.periodos[i].mm
        });
    }
    for (var i in inf.results) {
        var set = [];
        for (var j in inf.results[i].results)
            set.push({ "@value": inf.results[i].results[j].ganancia_neta });
        dataset.push({
            "@seriesName": inf.results[i].co_usuario,
            "@color": getRandomColor(),
            set
        });
    }
    {
        var set = [];
        for (var i in inf.periodos)
            set.push({ "@value": inf.costofijopromedio });
        dataset.push({
            "@seriesName": "Costo fijo medio",
            "@color": getRandomColor(),
            "@lineThickness": "3",
            "@parentYAxis": "S",
            set
        });
    }
    return {
        "graph": [{
            "@bgColor": "F1f1f1",
            "@caption": "Rendimiento Comercial",
            "@subCaption": "",
            "@showValues": "0",
            "@divLineDecimalPrecision": "2",
            "@formatNumberScale": "2",
            "@limitsDecimalPrecision": "2",
            "@PYAxisName": "",
            "@SYAxisName": "",
            "@decimalSeparator": ",",
            "@thousandSeparator": ".",
            "@SYAxisMaxValue": inf.axismaxvalue,
            "@PYAxisMaxValue": inf.axismaxvalue,
            categories: { category },
            dataset
        }]
    };
}

pie_inf01 = async (dateF, dateT, co_usuario_list) => {
    var fileName = "pieinf01" + new Date().getTime();
    fileName += "_" + Math.round(Math.random() * 100) + ".xml";
    var inf = await consultor.Informe01_multi(dateF, dateT, co_usuario_list);
    var depurated = pie_inf01_depurated(inf);
    try {
        var retval = await xml.write(fileName, depurated);
        return pie_inf01_embed_template(fileName);
    } catch (error) {
        console.log(error);
        return "";
    }
}

pie_inf01_embed_template = (fileName) => {
    return "<html><head></head><body>"
        + "<embed src='"+appEnv.url_prefix+"/file/FC_2_3_Pie3D.swf'"
        + " FlashVars='&dataURL="+appEnv.url_prefix+"/file/" + fileName + "&amp;chartWidth=600&amp;chartHeight=350'"
        + " quality='high' bgcolor='#FFFFFF' WIDTH='600' HEIGHT='350'"
        + ">"
        + "</embed></body></html>";
}

pie_inf01_depurated = (inf) => {
    var cleanData = [], set = [], total = 0;
    for (var i in inf) {
        total += inf[i].total.ganancia_neta;
        if (inf[i].total.total != 0) cleanData.push({
            co_usuario: inf[i].co_usuario, ganancia_neta: inf[i].total.ganancia_neta
        });
    }
    for (var i in cleanData)
        set.push({
            "@value": cleanData[i].ganancia_neta * 100 / total,
            "@name": cleanData[i].co_usuario,
            "@color": getRandomColor()
        });
    return {
        "graph": {
            "@bgColor": "F1f1f1",
            "@caption": "Rendimiento Comercial",
            "@decimalPrecision": "1",
            "@showPercentageValues": "1",
            "@showNames": "1",
            "@numberPrefix": "",
            "@showValues": "1",
            "@showPercentageInLabel": "1",
            "@pieYScale": "45",
            "@pieBorderAlpha": "40",
            "@pieFillAlpha": "70",
            "@pieSliceDepth": "15",
            "@pieRadius": "100",
            set
        }
    };
    /*
    */
}

getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

exports.bar_inf01 = bar_inf01;
exports.pie_inf01 = pie_inf01;