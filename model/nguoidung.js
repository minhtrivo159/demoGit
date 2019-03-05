// import $ from 'jquery';

export function NguoiDung(taiKhoan,matKhau,hoTen,email,soDT,mlnd){
    this.TaiKhoan = taiKhoan;
    this.MatKhau = matKhau;
    this.HoTen = hoTen;
    this.Email = email;
    this.SoDT = soDT;
    this.MaLoaiNguoiDung = mlnd;
}

export var hoTen = 5;
//module.exports có nghĩa là sẽ lấy ra những gì từ đối tượng
module.exports =  {
    ND : NguoiDung,
    ht : hoTen
}