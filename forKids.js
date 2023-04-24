function replaceBackground(req, res, next) {
    res.on("finish", function() {
        // Код здесь будет выполнен после полной загрузки страницы
        res.write(
            "<script>document.body.style.backgroundImage = 'url(/image/backgroundWebForKidsCompress.gif)'</script>"
        );
        next();
    });
}


module.exports = {replaceBackground}