#! /usr/bin/env node
import inquirer from "inquirer";
class ATM {
    user = [];
    constructor() {
        this.user.push({ accountNo: 2344, pin: 1234, balance: 4000 }),
            this.user.push({ accountNo: 2343, pin: 12345, balance: 5000 }),
            this.user.push({ accountNo: 455, pin: 123456, balance: 400 });
    }
    authe(accountNo, pin) {
        const user = this.user.find((user) => user.accountNo === accountNo && user.pin === pin);
        return user !== undefined;
    }
    getbalance(accountNo, pin) {
        const user = this.user.find((user) => user.accountNo === accountNo && user.pin === pin);
        return user?.balance;
    }
    withdraw(accountNo, amount) {
        const user = this.user.find((user) => user.accountNo === accountNo);
        // Check if the user has sufficient balance
        if (user.balance >= amount) {
            // Update the user's balance
            user.balance -= amount; //balance =balane-amount= 10000-5000=5000
            return true;
        }
        else {
            return false;
        }
    }
    deposit(accountNumber, amount) {
        const user = this.user.find((user) => user.accountNo === accountNumber);
        // Update the user's balance
        user.balance += amount; //4000+3000=7000
        return true;
    }
    start() {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'accountNumber',
                message: 'Enter your account number:',
            },
            {
                type: 'input',
                name: 'pin',
                message: 'Enter your PIN:',
                mask: '*',
            },
        ])
            .then((answers) => {
            const accountNumber = parseInt(answers.accountNumber);
            const pin = parseInt(answers.pin);
            if (this.authe(accountNumber, pin)) {
                inquirer
                    .prompt([
                    {
                        type: 'list',
                        name: 'action',
                        message: 'Select an action:',
                        choices: ['Check Balance', 'Withdraw', 'Deposit', 'Exit'],
                    },
                ])
                    .then((answers) => {
                    switch (answers.action) {
                        case 'Check Balance':
                            console.log(`Your balance is: ${this.getbalance(accountNumber, pin)}`);
                            break;
                        case 'Withdraw':
                            inquirer
                                .prompt([
                                {
                                    type: 'input',
                                    name: 'amount',
                                    message: 'Enter the amount to withdraw:',
                                },
                            ])
                                .then((answers) => {
                                const amount = parseInt(answers.amount);
                                if (this.withdraw(accountNumber, amount)) {
                                    console.log(`Withdrawal successful. New balance is: ${this.getbalance(accountNumber, pin)}`);
                                }
                                else {
                                    console.log('Insufficient balance.');
                                }
                            });
                            break;
                        case 'Deposit':
                            inquirer
                                .prompt([
                                {
                                    type: 'input',
                                    name: 'amount',
                                    message: 'Enter the amount to deposit:',
                                },
                            ])
                                .then((answers) => {
                                const amount = parseInt(answers.amount);
                                this.deposit(accountNumber, amount);
                                console.log(`Deposit successful. New balance is: ${this.getbalance(accountNumber, pin)}`);
                            });
                            break;
                        case 'Exit':
                            console.log('Goodbye!');
                            break;
                    }
                });
            }
            else {
                console.log('Invalid account number or PIN.');
            }
        });
    }
}
// Usage example
const atm = new ATM();
atm.start();
