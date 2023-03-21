
// =================== Phương Thức GET-----------------------------------

function getSinhVienApi () {

    var promise = axios({
        url:'https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
        method:'GET',

    });


    promise.then(function (result) {
        console.log('result',result.data);
        // gọi hàm tạo table
        renderSinhVien(result.data);
    });


    promise.catch(function (err) {
        console.log('result',err.response.data);
    });

}

window.onload = function () {
    getSinhVienApi()
}





/**
 * Hàm này sẽ nhận vào 1 array (sinhVien) và trả ra output là string <tr>....</tr>
 * @param {*} arrSinhVien arrSinhVien là mảng các object sinhVien [sinhVien1,sinhVien2,...]
 * @returns trả ra 1 giá trị là 1 htmlString '<tr>...</tr> <tr>...</tr>'
 */
 function renderSinhVien(arrSinhVien) { //param : input :arrSinhVien
    var html = ''; //output: string html 
    for (var i = 0; i < arrSinhVien.length; i++) {
        var sv = arrSinhVien[i]; //Mỗi lần duyệt lấy ra 1 object sinhVien từ mảng {maSinhVien:'1',tenSinhVien:'...',...}
        html += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.email}</td>
                <td>${sv.soDienThoai}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>
                    <button class="btn btn-primary mr-2" onclick="chinhSua('${sv.maSinhVien}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')">Xoá</button>
                </td>
            </tr>
        `;
    }
    document.querySelector('tbody').innerHTML= html;
}


// -------------------------------------POST: Thêm sinh viên____________________________-----------

document.querySelector('#btnXacNhan').onclick = function () {
    // {
    //   "maSinhVien": 0,
    //   "tenSinhVien": "string",
    //   "loaiSinhVien": "string",
    //   "diemToan": 0,
    //   "diemLy": 0,
    //   "diemHoa": 0,
    //   "diemRenLuyen": 0,
    //   "email": "string",
    //   "soDienThoai": "string"
    // }
    // Lấy thông tin khách hàng đúng format backend qui định
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    console.log('sv',sv);

    // gọi api
    var promise = axios({
        url:'https://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method:'POST',
        data: sv, // format backend yêu cầu
    });

    // xữ lý thành công
    promise.then(function (result) {
        console.log('result',result.data);
        getSinhVienApi();
    });
    
    // Xử Lý thất bại
    promise.catch(function (error) {
        console.log('error',error.response.data);
    });
}

function xoaSinhVien(maSinhVienClick) {
    console.log(maSinhVienClick);
    var promise = axios({
        url:'https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien='+maSinhVienClick,
        method:'DELETE',
    });
    promise.then(function(result){
        console.log('result',result.data);
        // load lại table = api lay danh sach 
        getSinhVienApi()
    });

    promise.catch(function(error){
        console.log(error);
    });
}


// --------------------------------GET: sửa sinh viên--------------------
function chinhSua (maSinhVienClick){
    var promise = axios({
        url:'https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien='+maSinhVienClick,
        method:'GET',
    });

    promise.then(function (result) {
        console.log('result',result.data);
        var ttsv = result.data;
        document.querySelector('#maSinhVien').value=ttsv.maSinhVien;
        document.querySelector('#tenSinhVien').value=ttsv.tenSinhVien;
        document.querySelector('#loaiSinhVien').value=ttsv.loaiSinhVien;
        document.querySelector('#diemToan').value=ttsv.diemToan;
        document.querySelector('#diemLy').value=ttsv.diemLy;
        document.querySelector('#diemHoa').value=ttsv.diemHoa;
        document.querySelector('#diemRenLuyen').value=ttsv.diemRenLuyen;
        document.querySelector('#email').value=ttsv.email;
        document.querySelector('#soDienThoai').value=ttsv.soDienThoai;
    });

    promise.catch(function (error) {
        console.log(error)
    })
}

document.querySelector('#btnCapNhat').onclick =  function(){
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    sv.diemToan = document.querySelector('#diemToan').value;
    sv.diemLy = document.querySelector('#diemLy').value;
    sv.diemHoa = document.querySelector('#diemHoa').value;
    sv.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    console.log('sv',sv);

    var promise = axios ({
        url:'https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+sv.maSinhVien,
        method:'PUT',
        data:sv,
    });

    promise.then(function(result){
        console.log('result',result.data);
        getSinhVienApi();
    });
    promise.catch(function(error){
        console.log(error);
    });
}