import { useSelector } from "react-redux"
import dayjs from 'dayjs'


const HistoryPage = () => {
  const userData = useSelector(state => state.user?.userData);

  return (
    <div>
      <div className="text-center m-7">
        <h2 className="text-2xl">History</h2>
      </div>

      <table className="w-full text-sm text-left text-gray-700">
        <thead className="border-[1px]">
          <tr>
            <th>Payment Id</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date of Purchase</th>
          </tr>

        </thead>

        <tbody>
          {userData?.history?.map((item, index)=>(
            <tr key={item.id+index} className="border-b">
              <td>{item.id}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{dayjs(item.dateOfPurchase).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}

export default HistoryPage