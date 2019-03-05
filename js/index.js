//import jquery (file js nào cần dùng jquery thì import vào file đó, không quan tâm cha con)
import $ from 'jquery';

//bootstrap là trường hợp đặt biệt cần cả css và js
//import bootstap css, đề hoàn chỉnh bootstrap cần 4 file, mỗi khi gửi bài bỏ thư mục node-modules đi
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
//import bootstrap js

import 'bootstrap';



import {NguoiDung} from '../model/nguoidung';

var DSND = [];
//Chức năng: Hiển thị modal thêm ng dùng
var hienThiModal = function () {
    // đổi title của modal
    $('.modal-title').html('Thêm Người Dùng'); //html = innerHtml

    var btnGroups = `
        <button class="btn btn-success" id="btnThem"> Thêm Người Dùng </button>
        <button class="btn btn-warning btnCN">Cập Nhật</button>
        <button class="btn btn-secondary" data-dismiss="modal"> Đóng </button>
    `
    $('.modal-footer').html(btnGroups);
    // $('#btnCapNhat').css('display','none');

}

// Chức năng : Thêm người dùng
var themNguoiDung = function () {

    // Lấy thông tin nhập vào từ input,value...
    var taiKhoan = $('#TaiKhoan').val();
    var matKhau = $('#MatKhau').val();
    var hoTen = $('#HoTen').val();
    var email = $('#Email').val();
    var soDT = $('#SoDienThoai').val();
    var mlnd = $('#maLoaiNguoiDung').val();

    //tạo đối tượng người dùng
    var NguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, mlnd)

    //kết nối server, thêm ng dùng mới
    $.ajax({
        url :'http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung',
        type:'POST',
        data: NguoiDungMoi
    }).done(function(result){
        //cách 1
        //getUserListFromDB();
        //cách 2 
        DSND.push(NguoiDungMoi);
        taoBang(DSND);

    }).fail(function(error){
        console.log(error)
    })
    
    // //push người dùng vào danh sách
    // DSND.push(NguoiDungMoi);

    //sau khi thêm xong ẩn modal hiển thị đi 
    $('.close').trigger('click');

    //clear các dữ liệu input đã nhập vào
    $('.modal-body input').val('');
    console.log(DSND);
    taoBang(DSND);
}


// Tạo bảng in ra HTMl
var taoBang = function (danhSach) {
    var content = '';
    for (var i = 0; i < danhSach.length; i++) {
        content += `
            <tr>
                <td>${i + 1}</td>
                <td>${danhSach[i].TaiKhoan}</td>
                <td>${danhSach[i].MatKhau}</td>
                <td>${danhSach[i].HoTen}</td>
                <td>${danhSach[i].Email}</td>
                <td>${danhSach[i].SoDT}</td>
                <td>
                    <button class="btn btn-info btnCapNhat"
                        data-taiKhoan = "${danhSach[i].TaiKhoan}"
                        data-matkhau = "${danhSach[i].MatKhau}"
                        data-hoten = "${danhSach[i].HoTen}"
                        data-email = "${danhSach[i].Email}"
                        data-sodt = "${danhSach[i].SoDT}"
                        data-maloainguoidung = "${danhSach[i].MaLoaiNguoiDung}"
                        data-toggle="modal"
                        data-target="#myModal"
                    >Cập Nhật</button>
                    <button class="btn btn-success btnXoa" data-taikhoan = "${danhSach[i].TaiKhoan}"> Xóa </button>
                    
                </td>
            </tr>
        `
    }
    $('#tblDanhSachNguoiDung').html(content);
}
//dùng data-taikhoan để lưu mỗi cái tài khoản nhập dc vào button

// Xóa người dùng
var xoaNguoiDung = function () {
    //b1: lấy id của tài khoản cần xóa, dùng this có nghĩa là khi nhấp vào nút nào thì this đại diện chonút đó
    // lấy ra data-taikhoan mà btn đang lưu
    var taiKhoan = $(this).attr('data-taikhoan'); /// attr bằng get attributes bên javascript
    // var index = timViTriTheoTaiKhoan(DSND, taiKhoan);
    // if (index !== -1) { // khác -1 => đã tìm dc id r 
    //     DSND.splice(index, 1); // trả về element bị xóa 
    //     taoBang(DSND);


    //     //a  = [ 1,2,3,4]
    //     //splice(0,1) [2,3,4]
    //     //slice(0,1) [ 1,2,3,4]
    // }

    //Xoa bằng Ajax
    $.ajax({
        url : 'http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/' + taiKhoan,
        type: 'DELETE'
        
    }).done(function(res){
        //console.log(res) //sau khi xóa dc trên giao diện rồi, thì ta copy hàm xuống để tiến hành xóa trong csdl của ta
        var index = timViTriTheoTaiKhoan(DSND,taiKhoan);
        console.log(index)
        if (index !== -1) { // khác -1 => đã tìm dc id r 
            DSND.splice(index,1); // trả về element bị xóa 
            taoBang(DSND);
        }
    }).fail(function(err){
        console.log(err)
    })
}

// tìm theo id, để tiến hành xóa tk
var timViTriTheoTaiKhoan = function (danhSach, taiKhoan) {
    for (var i = 0; i < danhSach.length; i++) {
        if (danhSach[i].TaiKhoan === taiKhoan) {
            return i;
        }
    }
    return -1;

}

//Lấy thông tin mà người dùng nhập vào                 
var layThongTinND = function () {
    //b1: lấy ra thông tin mà btn đang lưu
    var taiKhoan = $(this).attr('data-taikhoan');
    var matKhau = $(this).attr('data-matkhau');
    var hoTen = $(this).attr('data-hoten');
    var Email = $(this).attr('data-email');
    var soDT = $(this).attr('data-sodt');
    var maLoaiNguoiDung = $(this).attr('data-maloainguoidung');
    console.log(taiKhoan, matKhau)

    //b2: set giá trị cho input
    $('#TaiKhoan').val(taiKhoan);
    $('#MatKhau').val(matKhau);
    $('#HoTen').val(hoTen);
    $('#Email').val(Email);
    $('#SoDienThoai').val(soDT);
    $('#maLoaiNguoiDung').val(maLoaiNguoiDung);
    // //b3: gọi hàm cập nhật lại modal
    // capNhatNguoiDung(DSND);
}

//Hàm cập nhật modal
var capNhatNguoiDung = function(){
     // Lấy thông tin nhập vào từ input,value...
     var taiKhoan = $('#TaiKhoan').val();
     var matKhau = $('#MatKhau').val();
     var hoTen = $('#HoTen').val();
     var email = $('#Email').val();
     var soDT = $('#SoDienThoai').val();
     var mlnd = $('#maLoaiNguoiDung').val();

    //tạo đối tượng người dùng
    var NguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, mlnd)

    // //ajax cập nhật
    // $.ajax({
    //     url: 'api/QuanLyTrungTam/CapNhatThongTinNguoiDung ',
    //     type: 'PUT',
    //     data: NguoiDungMoi

    // }).done(function(res){
    //     // for (var i = 0; i < DSND.length; i++) {
    //     //     if (DSND[i].TaiKhoan === taiKhoan) {
    //     //         DSND[i] = NguoiDungMoi;
    //     //         break;
    //     //     }
            
    //     // }
    //     // taoBang(DSND)
    //     console.log(res)

    // }).fail(function(err){
    //     console.log(err)
    // })
   

    
    for (var i = 0; i < DSND.length; i++) {
        if (DSND[i].TaiKhoan === taiKhoan) {
            DSND[i] = NguoiDungMoi;
            break;
        }
       
    }

    taoBang(DSND)

    //sau khi thêm xong ẩn modal hiển thị đi 
    $('.close').trigger('click');

    //clear các dữ liệu input đã nhập vào
    $('.modal-body input').val('');
    console.log(DSND);
    taoBang(DSND);

}   

//--------------------------------- AJAX ---------------------------------------------
var getUserListFromDB = function(){
    $.ajax({
        
        url :'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
        type:'GET'
    }).done(function(res){
        //code chạy khi sv trả về kết quả
        DSND = res;
        taoBang(DSND);
        // console.log(res);
    }).fail(function(err){
        // console.log(err);
    })

    
}
getUserListFromDB();
// Gắn sự kiện 
$('#btnThemNguoiDung').click(hienThiModal);

//đối vói các thẻ mà dc tạo động từ code Javascript, thì ta sẽ gắn sự kiến theo cách khác
$('body').delegate('#btnThem', 'click', themNguoiDung)
$('body').delegate('.btnXoa', 'click', xoaNguoiDung)
$('body').delegate('.btnCapNhat', 'click', layThongTinND)
$('body').delegate('.btnCN', 'click', capNhatNguoiDung)


//26/2/2018
// B1 thay đổi hàm xóa, để xóa dữ liệu toàn sever tại dòng 94
// B2 thay đổi cập nhật ng dùng tại dòng 127