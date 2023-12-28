import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ProductEntity } from '../product/product.entity';
import { appendFileSync } from 'fs';
import { bgCyan, bgMagenta, black, cyan, rainbow, white } from 'colors'; // a cor que desejar usar

@Injectable()
export class LoggerService extends ConsoleLogger{

    public logFormater(name: string, quantity: number, value: number) {
        return "\x1b[34m" + ` LOCAL: ${this.context} - Name: ${name} - Amount: ${quantity} - Price: ${value} - TIMESTAMP ${this.getTimestamp()} `;
    }

    public coloredLog(product: ProductEntity) {
        const { name, availableQuantity, value } = product;
        const formatedLog = this.logFormater(name, availableQuantity, value);
        console.log(bgCyan(black(formatedLog)));
    }

    public logInFile(product: ProductEntity) {
        const { name, availableQuantity, value } = product;
        const formatedMessage = this.logFormater(name, availableQuantity, value) + '\n';
        const logPath = './src/modules/logger/file.log';
        appendFileSync(logPath, formatedMessage);
    }
        
}

