class General {
    /**
     * @returns {string} Random 6 char String
     */
    getRandomNum() {
        return Math.random().toString(36).substring(7).toLowerCase();
    }
}
export default new General();