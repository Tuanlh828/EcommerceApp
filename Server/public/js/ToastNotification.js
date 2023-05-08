let toastBox = document.getElementById("toastBox")
let successMsg = '<ion-icon name="checkmark-circle-outline"></ion-icon>Successfully submitted';
let errorMsg = '<ion-icon name="close-circle-outline"></ion-icon>Please fix the error!';
let invalidMsg = '<ion-icon name="alert-circle-outline"></ion-icon>Invalid input, check again';

function showToast(msg) {
   let toast = document.createElement('div');
   toast.classList.add('toast');
   toast.innerHTML = msg;
   toastBox.appendChild(toast);

   if (msg.includes('error')) {
      toast.classList.add('error');
   }
   if (msg.includes('Invalid')) {
      toast.classList.add('invalid');
   }
   setTimeout(() => {
      toast.remove();
   }, 2000);
}