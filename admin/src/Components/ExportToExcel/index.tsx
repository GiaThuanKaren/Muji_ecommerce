
import Link from 'next/link';
import { OrderDetailResponeModel } from 'src/Model/apiModel';

interface ExportExcelProps {
    data: OrderDetailResponeModel[]
}

const ExportToExcel: React.FC<ExportExcelProps> = ({ data }) => {
    return (
        <Link href={`api/exportExcel?data=${JSON.stringify(data)}`} legacyBehavior>
            <a download="order_data.csv">
                Export to Excel
            </a>
        </Link>
    );
};

export default ExportToExcel;