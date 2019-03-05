
import $ from 'jquery';
import Swal from 'sweetalert2';


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';

import 'bootstrap';
//import kiểu 1
NguoiDung,hoTen;
import {NguoiDung,hoTen} from '../model/nguoidung';
//import kiểu 2
import '../css/chitiet.css';
//import kiểu 3
// import NguoiDung from '../model/nguoidung';
// NguoiDung.ht; lấy ra họ tên



// Làm thế nào để khi bật qua trang chi tiết thì ta biết là chi tiết của khóa học nào
var CTKH; 

var layChiTietKhoaHoc = function(courseId){
    $.ajax({
        url: 'http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/' + courseId,
        type: 'GET'
    }).done(function(res){
        CTKH = res;
        taoBang();
        
        console.log(res);
    }).fail(function(err){
        console.log(err);
    })


}

var taoBang = function(){
    var content = '';
    content += `
            <div class="row">
                <div class = "col-6 pl-2">
                    <p>Mã Khóa Học : ${CTKH.MaKhoaHoc}</p>
                    <p>Tên Khóa Học :  ${CTKH.TenKhoaHoc}</p>
                    <p>Lượt Xem :  ${CTKH.LuotXem}</p>
                    <img src=" ${CTKH.HinhAnh}" alt="" style="height:300px">
                    <p>Mô tả :  ${CTKH.MoTa}</p>
                    <p>Người tạo :  ${CTKH.NguoiTao}</p>
                </div>
                
            </div>
    `   
    $('#ChiTietKhoaHoc').html(content);
}

//Hàm cắt chuổi ểể lấy id, cắt toàn bộ chuỗi nằm trước dấu bằng , rồi chuyền tham số vào chi tiết khóa học
function getParamsFromURL(){
    var params = window.location.search.substr(1,).split('='); //cat chuoi
    var courseId = params[1];
    console.log(courseId);
    layChiTietKhoaHoc(courseId);
}

getParamsFromURL();

Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    type: 'error',
    confirmButtonText: 'Cool'
  })

  Swal.fire({
    title: 'Custom width, padding, background.',
    width: 600,
    padding: '3em',
    background: '#fff url(/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      center left
      no-repeat
    `
  })

  let timerInterval
Swal.fire({
  title: 'Auto close alert!',
  html: 'I will close in <strong></strong> seconds.',
  timer: 20000,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      Swal.getContent().querySelector('strong')
        .textContent = Swal.getTimerLeft()
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (
    // Read more about handling dismissals
    result.dismiss === Swal.DismissReason.timer
  ) {
    console.log('I was closed by the timer')
  }
})