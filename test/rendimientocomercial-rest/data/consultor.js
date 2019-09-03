var database = require('../database');

Consultor = async (co_usuario) => {
    let results = await database.query("select * from cao_usuario where co_usuario='" + co_usuario + "'");
    return results;
}

ConsultorList = async () => {
    let results = await database.query("select u.co_usuario as id,u.no_usuario as value"
        + " from cao_usuario u"
        + " inner join permissao_sistema p on p.co_usuario=u.co_usuario"
        + " where (p.CO_SISTEMA=1 and p.IN_ATIVO='S' and p.CO_TIPO_USUARIO in(0,1,2))"
        + " order by u.no_usuario");
    return results;
}

Informe01 = async (dateF, dateT, co_usuario) => {
    var dateT_parts = dateT.split('-');
    if (dateF.length < 8) dateF += "-01";
    if (dateT.length < 8) dateT += "-" + new Date(dateT_parts[0], dateT_parts[1], 0).getDate()
    let consultor = await Consultor(co_usuario);
    let results = await database.query("select extract(YEAR from fa.data_emissao) as aaaa,extract(MONTH from fa.data_emissao) as mm,"
        + " round(sum(fa.valor),2) as valor,"
        + " round(sum(fa.valor-(fa.valor*fa.total_imp_inc/100)),2) as ganancia_neta,"
        + " round(coalesce((select brut_salario from cao_salario sa where sa.co_usuario=u.co_usuario order by sa.dt_alteracao limit 1),0),2) as costo_fijo,"
        + " round(sum((fa.valor-(fa.valor*fa.total_imp_inc/100))*fa.COMISSAO_CN/100),2) as comision"
        + " from cao_usuario u"
        + " inner join permissao_sistema p on p.co_usuario=u.co_usuario"
        + " inner join cao_os os on os.co_usuario=u.co_usuario"
        + " inner join cao_fatura fa on fa.co_os=os.co_os"
        + " where"
        + " u.co_usuario='" + co_usuario + "'"
        + " and (fa.data_emissao between '" + dateF + "' and '" + dateT + "')"
        + " group by u.co_usuario,extract(YEAR from fa.data_emissao),extract(MONTH from fa.data_emissao)"
        + " order by u.co_usuario,fa.data_emissao");
    let total = { valor: 0, ganancia_neta: 0, costo_fijo: 0, comision: 0, total: 0 };
    for (let r in results) {
        results[r].total = Math.round(results[r].ganancia_neta - results[r].costo_fijo - results[r].comision);
        total.valor += results[r].valor;
        total.ganancia_neta += results[r].ganancia_neta;
        total.costo_fijo += results[r].costo_fijo;
        total.comision += results[r].comision;
        total.total += Math.round(results[r].ganancia_neta - results[r].costo_fijo - results[r].comision);
    }
    let retval = {
        co_usuario: consultor[0].co_usuario,
        no_usuario: consultor[0].no_usuario,
        results: results,
        total: total
    };
    return retval;
}

Informe01_multi = async (dateF, dateT, co_usuario_list) => {
    var retval = [];
    for (var i in co_usuario_list) {
        var co_usuario = co_usuario_list[i];
        retval.push(await Informe01(dateF, dateT, co_usuario));
    }
    return retval;
}

exports.Consultor = Consultor;
exports.ConsultorList = ConsultorList;
exports.Informe01 = Informe01;
exports.Informe01_multi = Informe01_multi;
