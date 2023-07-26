'use client'
import Image from 'next/image'
import * as React from 'react';

const className_td = { className: 'uppercase p-2' };

const Dialog = ({ open, onOpenChange }) => {
  const initial = { name: '', username: '', passw: '', status: false }
  const [user, setUser] = React.useState(initial);
  const [errorMsg, setErroMsg] = React.useState('');
  React.useEffect(() => {
    if (!open) setUser(initial);
  }, [open])
  const onsubmit = async (e) => {
    e.preventDefault();
    setErroMsg('');
    try {
      const response = await fetch('/api/users', { method: 'POST', body: JSON.stringify(user) })
      const json = response.json();
      if (json) onOpenChange();
    } catch (error) {
      setErroMsg(error);
    }
  }
  if (open) return (
    <div className='bg-amber-400 z-10 absolute top-auto bottom-auto left-auto right-auto h-fit min-w-[600px] rounded-xl shadow-sm shadow-amber-300 p-4'>
      <div className='flex h-5 w-full justify-between text-gray-800'>
        <h1 className='text-lg font-semibold'>Tambah User</h1>
        <button onClick={onOpenChange} className='rounded-full mr-2 text-xl'>x</button>
      </div>
      <div className='mt-8 text-gray-800'>
        <form onSubmit={onsubmit} className='flex flex-col gap-1 text-sm'>
          <label className='grid grid-cols-2' for="nama_lengkap">
            <span>Nama Lengkap</span>
            <input onChange={({ target }) => setUser(p => ({ ...p, name: target.value }))} className='outline-none p-1 rounded-sm text-slate-950 text-sm placeholder:text-slate-950 placeholder:text-sm' id="nama_lengkap" type="text" placeholder='Masukkan Nama Lengkap' />
          </label>
          <label className='grid grid-cols-2' for="username">
            <span>Username</span>
            <input onChange={({ target }) => setUser(p => ({ ...p, username: target.value }))} className='outline-none p-1 rounded-sm text-slate-950 text-sm placeholder:text-slate-950 placeholder:text-sm' id="username" type="text" placeholder='Masukkan Username' />
          </label>
          <label className='grid grid-cols-2' for="password">
            <span>Password</span>
            <input onChange={({ target }) => setUser(p => ({ ...p, passw: target.value }))} className='outline-none p-1 rounded-sm text-slate-950 text-sm placeholder:text-slate-950 placeholder:text-sm' id="password" type="password" placeholder='Masukkan Password' />
          </label>
          <label className='grid grid-cols-2' for="status">
            <span>Status</span>
            <input onChange={({ target }) => setUser(p => ({ ...p, status: target.checked }))} className='p-1 rounded-sm text-slate-950 text-sm placeholder:text-slate-950 placeholder:text-sm' id="status" type="checkbox"/>
          </label>
          {errorMsg !== '' && <span className='text-pink-700 text-lg'>{JSON.stringify(errorMsg)}</span>}
          <button className='mt-[25px] rounded-md text-sm py-2 px-3 w-fit bg-red-500 text-slate-50' type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
  return null;
}

export default function Home() {
  const [dialogOpen, setDialog] = React.useState(false);
  const [data, setData] = React.useState([]);
  const fetch = async () => {
    try {
      const response = await fetch('/api/users')
      const json = response.json();
      if (json) setData(json);
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(fetch, []);
  const deleteRecord = async (id) => {
      try {
        const response = await fetch('/api/users', { method: "DELETE", body: JSON.stringify({ id }) })
        const json = response.json();
        if (json)  fetch();
      } catch (error) {
        console.error(error);
      }
  }
  return (
    <main className="relative flex flex-col items-center justify-between p-24">
      <Dialog open={dialogOpen} onOpenChange={() => setDialog(!dialogOpen)} />
      <div className="z-[1] relative max-h-[500px] flex flex-col w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className='p-5 sticky top-0 bg-black w-full flex align-middle justify-center z-10'>
          <button onClick={() => setDialog(!dialogOpen)} className='sticky top-0 w-[200px] rounded-md bg-red-500 p-2 text-base'>Tambah User</button>
        </div>
        <div className='relative h-[350px] w-fit overflow-y-scroll rounded-md'>
          <table className='shadow-sm shadow-slate-100 bg-amber-400 text-zinc-900'>
            <thead className='sticky top-0'>
              <tr className='bg-amber-400'>
                <td className={`${className_td.className} font-semibold`}>nama lengkap</td>
                <td className={`${className_td.className} font-semibold`}>username</td>
                <td className={`${className_td.className} font-semibold`}>status</td>
                <td className={`${className_td.className} font-semibold`}>aksi</td>
              </tr>
            </thead>
            <tbody className='overflow-y-scroll'>
              {data.length > 0 && data.map((i, idx) => (
                <tr key={idx}>
                  <td {...className_td}>iko</td>
                  <td {...className_td}>username</td>
                  <td {...className_td}>status</td>
                  <td onClick={() => deleteRecord(i.userid)} className='text-right cursor-pointer hover:text-slate-200'>del</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
