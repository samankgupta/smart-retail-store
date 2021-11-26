import React from 'react';
import './App.css';
import items from './items';

function App() {

  const [selectedItem, setSelectedItem] = React.useState('')
  const [allItems, setAllItems] = React.useState([])
  const [totalPrice, setTotalPrice] = React.useState(0)

  const addItem = (e) => {
    e.preventDefault();
    if (selectedItem !== '') {
      let tempitem = items.find(it => it.properties.id.type === selectedItem)
      let tp = totalPrice
      tp += parseInt(tempitem.properties.price.type)
      setTotalPrice(tp)
      if (!tempitem['quantity']) {
        tempitem['quantity'] = 1
        setAllItems([...allItems, tempitem])
      }
      else {
        let tempdelitem = tempitem
        tempdelitem['quantity'] += 1
        let index = allItems.indexOf(tempitem)
        allItems.splice(index, 1)
        setAllItems([...allItems, tempdelitem])
      }
    }
  }
  return (
    <div>
      <div className="min-h-screen flex flex-col justify-center bg-center bg-gray-50 py-12 px-4 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage: "url(" + "https://www.lsretail.com/hubfs/BLOG_supermarket-retail-physical-store.jpg" + ")",
        }}>
        <h2 className="text-5xl z-10 text-white mb-8">Smart Retail Store</h2>

        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg z-10 mt-6">
          <div>
            <form className="flex flex-col ">
              <div className="flex flex-col sm:flex-row items-center">
                <h2 className="font-semibold text-lg mr-auto mb-3">Add Products to Cart</h2>
                <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
              </div>
              <div className="w-full mb-3">
                <label className="font-semibold text-gray-600 py-2">Item</label>
                <select className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full " name="item"
                  onChange={(e) => setSelectedItem(e.target.value)}>
                  {items.map(it => <option value={it.properties.id.type}>{it.name}</option>)}
                </select>
                <p className="text-sm text-red-500 hidden mt-3" id="error">Please fill out this field.</p>
              </div>
              <button
                type="submit"
                onClick={addItem}
                className="inline-flex justify-center w-1/4 mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>
        <section className="py-1 bg-blueGray-50">
          <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-12">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">Cart</h3>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Item name
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        description
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Quantity
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {allItems.length === 0 ? <p className="my-4 ml-6">Cart is empty</p> :

                      allItems.map(item =>
                        <tr>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                            {item.name}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item.properties.name.description}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item.quantity}
                          </td>
                          <td className="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i className="text-orange-500 mr-4"></i>
                            {item.properties.price.type}
                          </td>
                        </tr>
                      )
                    }
                    <tr className="border-t-2">
                      <td></td><td></td>
                      <td className="px-6 font-medium text-sm p-3">
                        Total Price
                      </td>
                      <td className="px-6 font-medium text-sm p-3">
                        {totalPrice}/-
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div >
  );
}

export default App;
