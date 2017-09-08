const _ = require('lodash')
    , cfg = require('./../config')
    , db  = require('./../db')
    , utils = require('./../utils')
    , ExpenseUtils = new require('./../Classes/ExpenseUtils');

var eu = new ExpenseUtils();

module.exports = function (bot) {
    return function (message, args) {
        if (!args[0] && !args[1]) return bot.sendMessage(new bot.classes.Message(message.chat.id, `Please specify a month or category to clear the expenses record for.\nE.g. you can type \`${cfg.COMMANDS.RESET} April\` to clear expenses for April or \`${cfg.COMMANDS.RESET} #food\``, 'Markdown'), () => {});
        var callback = function (err, all) {
            if (err) bot.sendMessage(new bot.classes.Message(message.chat.id, `Sorry, failed to clear your expenses list. Make sure your command look like one of those in the /help.`, null, null, null, null, new bot.classes.ReplyKeyboardHide), () => {});
            bot.sendMessage(new bot.classes.Message(message.chat.id, `Successfully cleared your expenses.`, null, null, null, null, new bot.classes.ReplyKeyboardHide), () => {});
        };
        utils.deleteExpensesByUserMessage(db.getCollection(), message, args, callback);
    }
};
