import { createContext, useEffect, useState } from "react";
import BankSoal from './BankSoal.js'


export const QuestionContext = createContext();

export const QuestionProvider = ({children}) => {
  
  const bankSoal = BankSoal;
 
  const [modalData, setModalData] = useState({
    modal:false,
  });
  const [userData, setUserData] = useState([]);
  const [keranjangData, setKeranjangData] = useState([]);
  const [pembayaranData, setPembayaranData] = useState([]);
  const [historyPembayaranData,setHistoryPembayaranData] = useState([]);
  const [ujianSayaData, setUjianSayaData] = useState([]);
  const [allSoal, setAllSoal] = useState([]);

  const updateData = () => {
    // allSoal
    fetch('https://ujianlah-backend.vercel.app/allsoal')
    .then((response) => response.json())
    .then((data) => {setAllSoal(data)});

    //userData
    fetch('https://ujianlah-backend.vercel.app/getuserdata', {
      method:'GET',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setUserData(data))

    // keranjangData
    fetch('https://ujianlah-backend.vercel.app/getkeranjangdata', {
      method:'GET',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {setKeranjangData(data)});

    // pembayaranData
    fetch('https://ujianlah-backend.vercel.app/pembayarandata', {
      method:"GET",
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => setPembayaranData(data))

    //  historyPembayaranData
    fetch('https://ujianlah-backend.vercel.app/historypembayarandata', {
      method:"GET",
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => setHistoryPembayaranData(data))

    // ujian saya
    fetch('https://ujianlah-backend.vercel.app/ujiansayadata', {
      method:"GET",
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {setUjianSayaData(data)})
  }

  useEffect(() => {
    updateData();
  },[])

  const handleBatalBayar = (index) => {
    if(localStorage.getItem('auth-token')) {
      fetch('https://ujianlah-backend.vercel.app/batalbayar', {
        method:'POST',
        headers: {
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({index:index})
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          alert(data.message);
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / daftar terlebih dahulu')
    }
  }

  const handleBayar = (index) => {
    if(localStorage.getItem('auth-token')) {
      fetch('https://ujianlah-backend.vercel.app/bayar', {
        method:'POST',
        headers: {
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({index:index})
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.success) {
          alert(data.message);
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / daftar terlebih dahulu')
    }
  }

  const handlePembayaran = () => {
    if(localStorage.getItem('auth-token')) {
      fetch('https://ujianlah-backend.vercel.app/pembayaran', {
        method:'POST',
        headers: {
          Acccept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / daftar terlebih dahulu')
    }
  }

  const addToKeranjang = (ujian) => {

    if (localStorage.getItem('auth-token')) {
      fetch('https://ujianlah-backend.vercel.app/addtokeranjang', {
        method:"POST",
        headers: {
          Accept:"application/form-data",
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':"application/json"
        },
        body:JSON.stringify(ujian)
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          alert(data.message)
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / Daftar terlebih dahulu')
    }
    updateData();
  }

  const removeFromKeranjang = (ujian) => {
    if (localStorage.getItem('auth-token')) {
      fetch('https://ujianlah-backend.vercel.app/removefromkeranjang', {
        method:"POST",
        headers: {
          Accept:"application/form-data",
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':"application/json"
        },
        body:JSON.stringify(ujian)
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          alert(data.message)
          updateData();
        } else {
          alert(data.message)
        }
      })
    } else {
      alert('Masuk / Daftar terlebih dahulu')
    }
    
  }

  return <QuestionContext.Provider value={{bankSoal, modalData, setModalData, addToKeranjang, removeFromKeranjang, allSoal, keranjangData, handlePembayaran, pembayaranData, handleBayar, handleBatalBayar, historyPembayaranData, ujianSayaData, userData}}>{children}</QuestionContext.Provider>
}