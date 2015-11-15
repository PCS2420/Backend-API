module.exports.schedule = {
	sailsInContext : true, //If sails is not as global and you want to have it in your tas
	tasks : {
	  firstTask : {
		cron : "*/30 * * * *", // uma vez a cada minuto
		task : function (context)
		{
			var N_DIAS = 1, N_MINUTOS = 30; // deleta todas de trinta minutos atras
			
			var N_DIAS_ATRAS = new Date();
			var N_MINUTOS_ATRAS = new Date(new Date() - N_MINUTOS * 60000);
			N_DIAS_ATRAS.setDate(N_DIAS_ATRAS.getDate() - N_DIAS); // atualiza todas imagens travadas a cada N dias
			
			//Troque por N_DIAS_ATRAS se quiser realizar por dias, e por N_MINUTOS_ATRAS se quiser CRONAR por minutos
			console.log("[CRON] Tarefa que atualiza imagens velhas do estado EmAndamento.");
			Imagem.update({updatedAt: {$lt : N_MINUTOS_ATRAS}, estado: "EmAndamento"}, {estado: "Aberto"}).exec(function afterwards(err, res) {
				if (err) {
					console.log("[CRON] Ocorreu um erro ao tentar atualizar imagens. halp");
					return;
				}
				if (res.length == 0) {
					console.log("[CRON] Não houveram imagens para atualizar.");
				} else {
					console.log("[CRON] A(s) imagem(ns) foi(ram) atualizada(s) com sucesso! Falta expirar as descrições! get_rekt\n", res);
				}
			});
        },
        context : {}
      }
  }
};