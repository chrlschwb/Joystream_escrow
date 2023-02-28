
import React from 'react'

function Main() {
  return (
    <>
      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className='text-2xl text-center'>
              Currently listed offers
            </div>
            <div className="p-1.5 mt-5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        buy
                      </th>

                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>

                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        jonne62@gmail.com
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        150$
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        6000000 joy
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <a
                          className="text-green-500 hover:text-green-700"
                          href="#"
                        >
                          Buy
                        </a>
                      </td>

                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main