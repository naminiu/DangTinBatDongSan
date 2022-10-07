class batdongsan {
    constructor(id, title, content, area, size, direction, price, location, avatar) {
        this.id = id;
        this.title = title;
        this.area = area;
        this.content = content;
        this.size = size;
        this.direction = direction;
        this.price = price;
        this.location = location;
        this.avatar = avatar;
    }
}

var batdongsans = []
const keyData = "batdongsanData";

function init() {
    if (getData("keyData") == null) {
        batdongsans = [
            new batdongsan(1, "✅2 LÔ ĐẤT KIỆT ÔTÔ HOÀNG QUỐC VIỆT - AN ĐÔNG CHỈ 2TỶ2X", "Vị trí lô đất cách trục Hoàng Quốc Việt chỉ 300m, thông ra Tố Hữu 350m, gần các Khu Đô thị lớn TP Huế. Khu vực dân cư sầm uất, văn minh, tiện ích bao quanh. Diện tích 60.2m2 - 60.4m2, Đường bêtông 3m, Hướng Nam, Đất ở đô thị 💯", 110, "5,5x20", "Đông Nam", 900000000, "đường Cao Lãnh, p. Xuân Phú, TP Huế", "https://alonhadat.com.vn/files/properties/2022/10/3/images/111752319-4050-ban-nha-mat-tien-ha-noi-gia-re.jpg"),
            new batdongsan(2, "💥ĐẤT MT KIỆT XÓM 6 LẠI THẾ - PHÚ THƯỢNG CHỈ 2TỶ1X", "✔ Diện tích 79m2 Ngang 4m Nở hậu 4.5m ✔ Đường ôtô 4m ✔ Hướng Tây Bắc ✔ Full đất thổ cư Vị trí mặt tiền kiệt xóm 6 Lại Thế, Phú Thượng, TP Huế. Cách Sân Vận động Phú Thượng chỉ 250m, cách trục Phạm Văn Đồng 400m. Khu vực cao ráo, dân cư đông đúc, tiện ích đầy đủ", 79, "4x20", "Đông Nam", 2170000000, "đường Cao Lãnh, p. Xuân Phú, TP Huế", "https://alonhadat.com.vn/files/properties/2022/10/3/images/011751231-1808-ban-toa-ccmn-so132-cau-giay-120m2x7t-gia-19-5-ty-29-phong-khep-kin-sat-o-to-.jpg"),
        ]
        setData("keyData", batdongsans);
    } else {
        batdongsans = getData("keyData");
    }
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key))
}
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function renderbatdongsan() {
    let htmls = batdongsans.map(function (bds) {
        return `
        <tr><td>
            <table style='' class="distance">
                <tbody id="tr_${bds.id}">
                    <tr >
                        <td colspan="5" class="col1">${bds.title}</td>
                    </tr>
                    <tr >
                        <td rowspan="3"><img class="avatar-sm" src="${bds.avatar}"></td>
                        <td colspan="4" class="contentshow">${bds.content}...<a href="">&#9734;&#9734;Xem chi
                                tiết&#9734;&#9734;</a></td>
                    </tr>
                    <tr>
                        <td><b>Diện tích:</b>  ${bds.area}  m2</td>
                        <td><b>KT:</b> ${bds.size} m</td>
                        <td><b>Hướng:</b> ${bds.direction}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="" class="priceshow" type="number"><b> Giá:</b> ${formatCurrency(bds.price)}</td>
                        <td colspan="2"><b>Vị trí: </b>${bds.location}</td>
                        <td colspan="1" id="action_${bds.id}">
                                        <button class="btn1 btn-dark1" onclick="change(${bds.id})">Chỉnh sửa</button>
                                        <button class="update d-none" onclick="update(${bds.id})">Cập nhật</button>
                                        <button class="cancel d-none" onclick="Cancel(${bds.id})">Hủy</button>
                                        <button class="btn1 btn-warning1" onclick="remove(${bds.id})">Xóa</button>
                        </td>
                    </tr>
                    <tr>
                    <td></td>
                    </tr>
                </tbody>
            </table>
            </td></tr>
        `
    })
    console.log(htmls)
    document.getElementById("tbLand").innerHTML = htmls.join("");
}



function addbatdongsan() {
    let title = document.querySelector("#title").value;
    let content = document.querySelector("#content").value;
    let area = document.querySelector("#area").value;
    let size = document.querySelector("#size").value;
    let direction = document.querySelector("#direction").value;
    let price = Number(document.querySelector("#price").value);
    let location = document.querySelector("#location").value;
    let avatar = document.querySelector("#avatar").value;
    if (!validation(title)) {
        alert("Tiêu đề là bắt buộc")
        return;
    }
    if (!validation(content)) {
        alert("Nội dung là bắt buộc")
        return;
    }
    if (!validation(area)) {
        alert("Diện tích là bắt buộc")
        return;
    }
    if (!validation(size)) {
        alert("Kích thước là bắt buộc")
        return;
    }
    if (!validation(direction)) {
        alert("Hướng là bắt buộc")
        return;
    }
        // if (!validation(price)) {
        //     alert("Giá là bắt buộc")
        //     return;
        // }
    if (!validation(location)) {
        alert("Vị trí là bắt buộc")
        return;
    }
    if (!validation(avatar)) {
        alert("Hình ảnh là bắt buộc")
        return;
    }
    let id = getLastestId() + 1;
    let newBatdongsan = new batdongsan(id, title, content, area, size, direction, price, location, avatar)
    console.log(newBatdongsan);
    batdongsans.push(newBatdongsan);
    setData("keyData", batdongsans);
    renderbatdongsan();
    resetForm();
}

function validation(field) {
    return field != null && field.trim() != '';
}

function formatCurrency(number) {
    return number.toLocaleString('vi', { style: 'currency', currency: 'VND' });
}

function resetForm() {
    document.querySelector("#title").value = "";
    document.querySelector("#content").value = "";
    document.querySelector("#area").value = "";
    document.querySelector("#size").value = "";
    document.querySelector("#direction").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#location").value = "";
    document.querySelector("#avatar").value = "";
}

function remove(id) {
    console.log(id);
    let confirmed = window.confirm("Bạn có muốn xóa sản phẩm này không?");
    if (confirmed) {
        let position = batdongsans.findIndex(function (pdt) {
            return pdt.id == id;
        })
        batdongsans.splice(position, 1);
        setData("keyData", batdongsans);
        renderbatdongsan();
    }
}

function getproductbyid(bdsid) {
    return batdongsans.find(function (pdt1) {
        return pdt1.id == bdsid;
    })
}

function change(bdsid) {
    let product = getproductbyid(bdsid);
    let tdElements = document.querySelectorAll(`#tr_${bdsid} tr td`);
    tdElements[0].innerHTML = `<input type="text" class="form-control-md" value="${product.title}" />`;
    tdElements[1].innerHTML = `<input type="text" class="form-control-md" value="${product.avatar}" />`;
    tdElements[2].innerHTML = `<textarea class="form-control-md">${product.content}</textarea>`;
    tdElements[3].innerHTML = `<input type="text" class="form-control-md" value="${product.area}" />`;
    tdElements[4].innerHTML = `<input type="text" class="form-control-md" value="${product.size}" />`;
    tdElements[5].innerHTML = `<input type="text" class="form-control-md" value="${product.direction}" />`;
    tdElements[7].innerHTML = `<input type="text" class="form-control-md" value="${product.price}" />`;
    tdElements[8].innerHTML = `<input type="text" class="form-control-md" value="${product.location}" />`;
    let action = document.getElementById(`action_${bdsid}`);
    action.children[0].classList.add("d-none")
    action.children[1].classList.remove("d-none")
    action.children[2].classList.remove("d-none")
    action.children[3].classList.add("d-none")

}

function Cancel(bdsid) {
    let tdElements = document.querySelectorAll(`#tr_${bdsid} tr td`);
    let product = getproductbyid(bdsid);
    tdElements[0].innerHTML = product.title;
    tdElements[1].innerHTML = `<img class="avatar-sm" src="${product.avatar}"> `;
    tdElements[2].innerHTML = ` ${product.content}...<a href="">&#9734;&#9734;Xem chi tiết&#9734;&#9734;</a>`;
    tdElements[3].innerHTML = `<b>Diện tích:</b> ${product.area} m2`;
    tdElements[4].innerHTML = `<b>KT: </b>${product.size} m`;
    tdElements[5].innerHTML = `<b>Hướng: </b>${product.direction}`;
    tdElements[7].innerHTML = `<b>Giá: </b>${formatCurrency(product.price)}`;
    tdElements[8].innerHTML = `<b>Vị trí: </b>${product.location}`;
    let action = document.getElementById(`action_${bdsid}`);
    action.children[0].classList.remove("d-none")
    action.children[1].classList.add("d-none")
    action.children[2].classList.add("d-none")
    action.children[3].classList.remove("d-none")

}

function update(bdsid) {
    let tdElements = document.querySelectorAll(`#tr_${bdsid} tr td`);
    // let tdElements = document.querySelector(`tr_${bdsid}`)
    let product = getproductbyid(bdsid);
    let newproducttitle = tdElements[0].children[0].value;
    let newproductavatar = tdElements[1].children[0].value;
    let newproductcontent = tdElements[2].children[0].value;
    let newproductarea = tdElements[3].children[0].value;
    let newproductsize = tdElements[4].children[0].value;
    let newproductdirection = tdElements[5].children[0].value;
    let newproductprice = Number(tdElements[7].children[0].value);
    let newproductlocation = tdElements[8].children[0].value;
    product.title = newproducttitle;
    product.avatar = newproductavatar;
    product.content = newproductcontent;
    product.area = newproductarea;
    product.size = newproductsize;
    product.direction = newproductdirection;
    product.price = newproductprice;
    product.location = newproductlocation;
    setData("keyData", batdongsans);
    Cancel(bdsid);
}

function getLastestId() {
    let productTemp = [...batdongsans];
    let maxId = productTemp.sort(function (pdt1, pdt2) {
        return pdt2.id - pdt1.id
    })[0].id
    return maxId;
}

function ready() {
    init();
    renderbatdongsan();
}
ready();