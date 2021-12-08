import React from 'react';
import './App.css';
import items from './items';
import QRCode from "react-qr-code";

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

  function openModal(key) {
    document.getElementById(key).showModal();
    document.body.setAttribute('style', 'overflow: hidden;');
    document.getElementById(key).children[0].scrollTop = 0;
    document.getElementById(key).children[0].classList.remove('opacity-0');
    document.getElementById(key).children[0].classList.add('opacity-100');
    document.addEventListener('click', function (e) {
      if (e.target.className && e.target.className.includes("fixed"))
        modalClose('modal')
    }, false);
  }

  function modalClose(key) {
    document.getElementById(key).children[0].classList.remove('opacity-100');
    document.getElementById(key).children[0].classList.add('opacity-0');
    setTimeout(function () {
      document.getElementById(key).close();
      document.body.removeAttribute('style');
    }, 100);
  }
  return (
    <div>
      <dialog id="modal" className="bg-transparent z-0 relative w-screen h-screen">
        <div className="p-6 flex justify-center items-center fixed left-0 top-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300 opacity-0">
          <div className="bg-white rounded-lg">
            <div>
              <div className="px-7 pt-6 pb-2 grid grid-cols-2">
                <h1 className="font-semibold text-base">Checkout</h1>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Multiplication_Sign.svg/1024px-Multiplication_Sign.svg.png" alt="Close" className="w-5 ml-auto cursor-pointer" onClick={() => modalClose("modal")}></img>
              </div>
              <div className="my-8 mx-8">
                <QRCode value={totalPrice.toString()} />
              </div>
            </div>
          </div>
        </div>
      </dialog>
      <div className="min-h-screen flex flex-col justify-center bg-center bg-gray-50 py-12 px-4 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage: "url(" + "https://www.lsretail.com/hubfs/BLOG_supermarket-retail-physical-store.jpg" + ")",
        }}>
        <h2 className="text-5xl z-10 text-green-400 mb-8">Smart Retail Store</h2>

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
                className="inline-flex justify-center w-1/4 mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>
        <section className="py-1 bg-greenGray-50">
          <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-12">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-greenGray-700">Cart</h3>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-greenGray-50 text-greenGray-500 align-middle border border-solid border-greenGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Item name
                      </th>
                      <th className="px-6 bg-greenGray-50 text-greenGray-500 align-middle border border-solid border-greenGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        description
                      </th>
                      <th className="px-6 bg-greenGray-50 text-greenGray-500 align-middle border border-solid border-greenGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Quantity
                      </th>
                      <th className="px-6 bg-greenGray-50 text-greenGray-500 align-middle border border-solid border-greenGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {allItems.length === 0 ? <p className="my-4 ml-6">Cart is empty</p> :

                      allItems.map(item =>
                        <tr>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-greenGray-700">
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
        <section className="py-1">
          <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-6">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <button
                      type="submit"
                      onClick={() => openModal('modal')}
                      className="mt-4 py-3 px-7 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div >
  );
}

export default App;
