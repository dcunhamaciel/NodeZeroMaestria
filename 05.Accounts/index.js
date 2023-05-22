const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')

operation()

function operation() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'O que você deseja fazer?',
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }])
        .then((answer) => {
            const action = answer.action

            if (action === 'Criar Conta') {
                createAccount()
            } else if (action === 'Consultar Saldo') {
                //
            } else if (action === 'Depositar') {
                deposit()
            } else if (action === 'Sacar') {
                //
            } else if (action === 'Sair') {
                closeProgram()
            }
        })
        .catch((error) => console.log(error))
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount() {
    inquirer
        .prompt([
            {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:'
            }
        ])
        .then((answer) => {
            const accountName = answer.accountName
            
            console.log(accountName)

            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts')
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'))
                buildAccount()
                return
            }

            fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', (error) => console.log(error))

            console.log(chalk.bgGreen('Parabéns, a sua conta foi criada!'))

            operation()
        })
        .catch((error) => console.log(error))
}

function deposit() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Qual o nome da sua conta?'
            }
        ])
        .then((answer) => {
            const accountName = answer.accountName

            if (!checkAccount(accountName)) {
                return deposit()
            }

            inquirer
                .prompt([
                    {
                        name: 'amount',
                        message: 'Quanto você deseja depositar?'
                    }
                ])
                .then((answer) => {
                    const amount = answer.amount

                    addAmount(accountName, amount)
                    operation()
                })
                .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
}

function addAmount(accountName, amount) {
    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }

    const accountData = getAccount(accountName)

    accountData.balance += parseFloat(amount);

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (error) => console.log(error))

    console.log(chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta!`))
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
        return false
    }

    return true
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

function closeProgram() {
    console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
    process.exit()
}