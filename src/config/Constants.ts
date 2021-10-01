export default {
  DefaultErrorMessage: 'Đã xảy ra lỗi, vui lòng thử lại sau',
  AppTours: [
    'Khi bạn nhập phần hàng hóa của bạn, có thể tùy chọn để gian hàng của bạn cũng hiện lên Abubu Word để bán hàng trên này',
    'Bạn nhập hàng hóa trong kho, điều chỉnh giá nhập, giá bán của mình tại đây',
    'Bạn xử lý các giao dịch bán hàng trực tiếp, bán hàng Ship Cod, bán theo đơn đặt bàn, phòng, trả hàng, nhập hàng tại đây',
    'Bạn thêm mới, kiểm tra các thông tin khách hàng, đối tác bao gồm lịch sử mua hàng, nhập hàng, công nợ tại đây',
    'Bạn quản lý quyền truy cập nhân viên và lập phiếu tính lương cho nhân viên tại đây',
    'Bạn lập phiếu chi, phiếu thu, quản lý tiền mặt, tiền tài khoản tại đây',
    'Bạn kiểm tra hoạt động tài chính và các hoạt động bán hàng tại đây',
    'Giờ mọi việc phụ thuộc vào bạn, màn hình sẽ chuyển sang mục “Thiết lập cửa hàng” Nếu bạn cần giúp đỡ, hãy để ý tìm hình này:',
  ],
  FilterOptions: [
    {id: 'createdAt,desc', title: 'Mới nhất'},
    {id: 'createdAt,asc', title: 'Cũ nhất'},
    {id: 'price,asc', title: 'Giá tăng'},
    {id: 'price,desc', title: 'Giá giảm'},
    {id: 'name,asc', title: 'A - Z'},
    {id: 'name,desc', title: 'Z - A'},
  ],
  PageSize: 30,
  DefaultPrice: {
    id: -1,
    name: 'Giá bán chung',
    type: 0,
    value: 50,
    uom: 'percent',
  },
  Events: {
    OrderChange: 'OrderChange',
    OrderListChange: 'OrderListChange',
  },
};
