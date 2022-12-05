import { ToastContainer, toast } from "react-toastify";
import { toBlob } from "html-to-image";

// SUCCESS TOAST MESSAGE
export const success_notify = (message,delay)=>{

   return toast.success(message, {
        position: "top-right",
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}

// FAILURE TOAST MESSAGE
export const fail_notify = (message,delay)=>{

    return toast.error(message, {
        position: "top-right",
        autoClose:delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
 }

// SEPERATE PRICE WITH COMMAS 49,000
 export const numberWithCommas = (x)=> {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}


export const handleShare = async (imageRef) => {
    const newFile = await toBlob(imageRef.current);
    const data = {
      files: [
        new File([newFile], "qrcode.png", {
          type: newFile.type
        })
      ],
      title: "Skygoal QR CODE",
      text: "Scan to make payment"
    };

    try {
      if (!navigator.canShare(data)) {
        console.error("Can't share");
      }
      await navigator.share(data);
      success_notify('Shared successFully!',3000 )
    } catch (err) {
      console.error(err);
      fail_notify('Shareing qr code failed',3000)
    }
  };