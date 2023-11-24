// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OrderDetailResponeModel } from 'src/Model/apiModel';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        const { data } = req.query
        const parseData: OrderDetailResponeModel[] = JSON.parse(data)
        const csv = OrderToExcel(parseData);

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment; filename=order_data.csv')
        res.status(200).end(csv)

    } catch (error) {
        console.error(error)
        res.status(500).end('Interal Server Error')
    }
}

function OrderToExcel(data: OrderDetailResponeModel[]): string {

    const header = Object.keys(data[0]).join(',') + '\n';
    const body = data.map(item => Object.values(item).join(',')).join('\n');

    return header + body;
}