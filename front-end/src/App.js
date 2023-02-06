import { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [userId, setUserId] = useState('');
  const [sectors, setSectors] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/sectors')
      .then((res) => res.json())
      .then((res) => setSectors(res.responseParent))
      .catch((err) => console.log({ err }))
  },
    [])

  const data = []
  sectors?.forEach((section) => {
    data.push(<option className=' pl-2 md:pl-5 font-bold hover:bg-sky-100 cursor-pointer' value={section.value}>{section.name}</option>);
    section.childs.length > 0 && section.childs.forEach((child) => {
      data.push(<option className=' pl-6 md:pl-14 hover:bg-sky-100 cursor-pointer' value={child.value}>{child.name}</option>);
      child.childs.length > 0 && child.childs.forEach((child) => {
        data.push(<option className=' pl-12 md:pl-24 hover:bg-sky-100 cursor-pointer' value={child.value}>{child.name}</option>);
        child.childs.length > 0 && child.childs.forEach((child) => {
          data.push(<option className=' pl-20 md:pl-32 hover:bg-sky-100 cursor-pointer ' value={child.value}>{child.name}</option>);
          child.childs.length > 0 && child.childs.forEach((child) => {
            data.push(<option className=' pl-24 md:pl-40 hover:bg-sky-100 cursor-pointer ' value={child.value}>{child.name}</option>);
          });
        });
      });
    })
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ e: e.target.name.value })
    console.log({ e: e.target.selectors.value })
    console.log({ e: e.target.checkbox.checked })
    if (!e.target.name.value && !e.target.selectors.value && !e.target.checkbox.checked) return;

    const data = {
      name: e.target.name.value,
      selector_id: Number(e.target.selectors.value),
      agree_of_terms: e.target.checkbox.checked
    };

    if (userId) data["_id"] = userId;

    fetch('http://localhost:5000/users', {
      method: `POST`,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.err) {
          console.log(res.err);

          toast.error('failed to upload!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
          });

          throw new Error('failed to update');

        }
        e.target.name.value = res.response?.name
        e.target.selectors.value = res.response?.selector_id
        e.target.checkbox.checked = res.response?.agree_of_terms
        if (res.response?._id) setUserId(() => res.response._id)

        console.log({ res })
      })
      .catch((err) => console.log({ err }))
  }
  console.log({ userId })
  return (
    <>
      <ToastContainer />
      <div className=" text-md text-sky-600 w-screen h-screen flex justify-center items-center bg-slate-100 p-4">
        <div className="w-full max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="text-center py-2 font-bold text-xl">
              Please enter your name and pick the Sectors you are currently
              involved in.
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="name"
                required
              />
            </div>
            <div className="mb-6 text-sm md:text-base">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="selectors"
              >
                Sectors:
              </label>
              <select
                className="w-full focus:outline-sky-600 "
                id="selectors"
                multiple=""
                size="6"
                required={true}
              >
                {/* import sectors */}
                {data}
              </select>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="checkbox"
                type="checkbox"
                required={true}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="checkbox"
                className="ml-2 text-sm font-semibold text-gray-900 "
                value={1}
              >
                Agree to terms
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
