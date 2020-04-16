describe('Главная страница', function() {
    it('Не указан токен для подключения к БД', function() {
        return this.browser
            .url('localhost:3000/')
            .assertView('PageStartScreen', 'body');
    });
});