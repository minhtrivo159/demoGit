var DSKH = [];
var danhSachKhoaHoc = function(){
   
        //khai báo api
        $.ajax({
            url : 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc',
            type : 'GET'
        }).done(function(res){
            // khi có DsKH 
            DSKH = res;
            taoBang();
            console.log(res);
        }).fail(function(err){
            console.log(err);
        }) 
  
    }

var taoBang = function(){
    var content = '';
    for(var i = 0; i < DSKH.length; i ++){
        content += `
                <div class="col-3">
                    <div class="card mb-3">
                        <img src="${DSKH[i].HinhAnh}" style="height:300px"/>
                        <p>${DSKH[i].TenKhoaHoc}</p>
                        <p>Người tạo : ${DSKH[i].NguoiTao}</p>
                        <a href="chitiet.html?makhoahoc=${DSKH[i].MaKhoaHoc}" class="btn btn-success mg-2 btnXemChiTiet"> Xem Chi Tiết </a>
                    </div>
                 </div>

        `
    }
    $('#danhSachKhoaHoc').html(content);
}
// cách 1  <button class="btn btn-success mg-2 btnXemChiTiet"> Xem Chi Tiết </button> 
// cách 2 a href

$('body').delegate('.btnXemChiTiet','click',function(){
   // window.location.assign('chitiet.html') 
   // window là lớp phân cấp cao nhất trong trang web

   //Để phân biệt dc chitiet của khóa học nào
//    window.location.assign('chitiet.html?makhoahoc=' + maKhoaHoc)
})
danhSachKhoaHoc();