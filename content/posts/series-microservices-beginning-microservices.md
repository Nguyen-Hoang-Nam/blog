---
title: "Series Microservices: Bắt đầu với Microservices"
date: 2022-03-06T12:51:24+07:00
draft: false
tags: ["microservices"]
image: "/images/series-microservices-beginning-microservices.jpg"
creditAuthor: "JOHN TOWNER"
creditAuthorLink: "https://unsplash.com/@heytowner?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
creditUnsplash: "https://unsplash.com/s/photos/forest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
---

Có lẽ Microservices không còn là một thuật ngữ quá mới đối với Dev nữa khi mà ngày càng nhiều Framework,
Platform hỗ trợ kiến trúc này. Vì vậy, để các bạn mới bắt đầu với kiến trúc này có thể tìm hiểu về nó,
mình quyết định bắt đầu 1 series nhỏ giới thiệu qua những khái niệm cũng như những thứ hay hó khác.
Nếu bạn đã sẵn sàng thì chúng ta bắt đầu nào.

## Microservices là gì nhỉ?

Khác với những kiến trúc hay những Design Pattern khi mà nó thường bao hàm cách để có thể tự mình implement
lại được. Microservices có vẻ mập mờ hơn, điểm chung lớn nhất của những người nói họ thiết kế hệ thống theo
Microservices là hệ thống giồng rất nhiều Project và chúng dùng api để giao tiếp với nhau.

Sự mập mờ còn từ chữ "micro" nữa, từ này thể hiện là chúng ta cần chia hệ thống thành rất nhiều phần nhỏ,
nhưng nhỏ tới thế nào thì lại không rõ lắm. Chia nhỏ tới từng Function hay từng Class thì có vẻ không ổn lắm,
vậy kiến trúc MVC cũng chia hệ thống thành 3 phần nhỏ hơn thì có thể gọi là Microservices không nhỉ?

Thậm chí nguồn gốc của kiến trúc Microservices cũng rất mập mờ. Khi mà nhiều công ty lớn về lập trình cho
rằng họ đã sử dụng kiến trúc này từ vài thập kỉ về trước, nếu như vậy xem chừng kiến trúc này cũng không
hẳn là đột phá lắm. Vậy lý do nào khiến nó được chú ý ở thời điểm hiện tại như vậy?

Xem chừng dù chưa trả lời được câu hỏi Microservices là gì thì chúng ta đã gặp hàng đống vấn đề khác rồi.
Vì vậy mình nghĩ cách tiếp cận tốt nhất với Microservices là xem những ông lớn trong ngành đang dùng nó
như thế nào. Nổi tiếng nhất có thể kể tới ông lớn Netflix, không chỉ có những Series phim hay, công ty
này cũng dóng góp cho cộng đồng nhiều những Frameword để implement các service trong kiến trúc Microservices.
Họ còn thuyết trình về hệ thống đó nữa, và mình recommend bạn nên xem qua nó để hình dung sơ qua
vấn đề mà Netflix đã giải quyết với kiến trúc Microservervice.

{{< youtube CZ3wIuvmHeM >}}

Thì như ta thấy các Service trong kiến trúc Microservices này độc lập với nhau, chúng gọi nhau qua các
API là các protocol như HTTP, GRPC, Thift, Websocket hay những cơ chế Pub/Sub. Các Service này cũng
có tính đóng gói để dễ dàng dóng thành các Container riêng. Các Service này cũng xử lý logic, business
hoặc trung chuyển dữ liệu, chúng có thể sử dụng DB hoặc không.

Thì với cách hiểu ở trên thì rõ ràng không hề có 1 chỗ nào nói các Service sẽ phải nhỏ cả, mình nghĩ
đây là một nhầm lẫn mà ta thường gặp phải.

## Chuẩn bị nguyên liệu chính

Để làm gỏi món Microservices này, thì mình nghĩ một số nguyên liệu sau đây có thể sẽ rất là cần thiết.
Tất nhiên là bạn có thể không cần dùng hết tất cả nếu hệ thống của bạn vẫn vận hành ổn.

### Gateway

Như mình có nói ở trên thì các Service độc lập và giao tiếp qua tầng Network, vậy trừ khi bạn quyết
định để mỗi Service publish một IP riêng ra bên ngoài vì không thể tranh nhau cùng một port được.
Thì Gateway xem chừng là một thứ không thể thiếu được, nó sẽ handle việc Reverse Proxy cũng như Load
Balance. Mỗi request từ phía client đều sẽ phải đi qua Gateway, và nó sẽ phần chia request tới chính
xác Service. Chính vì Gateway cũng làm việc độc lập và giao tiếp qua Network, nên Gateway thường sẽ
là một Service trong hệ thống.

### Service Discovery

Một điểm mạnh của kiến trúc Microservices đó là khả năng Scale của nó, mỗi Service độc lập, việc bạn
Scale một Service lên sẽ không ảnh hưởng tới các Service khác. Nhưng đồng thời điều này cũng mang
tới thách thức về việc các Service gọi nhau khi mà không biết được Port hoặc chí là IP của Service
sau khi Scale. Để giải quyết vấn đề này thì ta thường sẽ sử dụng một Service là Service Discovery,
nhiệm vụ chính của Service này là lưu thông tin về Port cũng như IP của tất cả Service trong hệ thống,
khi có Service cần gọi cho Service thì sẽ gửi request lên Service Discovery để tìm thông về Service
mà nó cần gọi. Do Service Discovery giải quyết một vấn đề tương đói quan trọng nên da số hệ thống
Microservices đều sẽ có một Service làm nhiệm vụ này.

### Chuẩn bị thêm gia vị

Để giúp món ăn Microservices được ngon thì bạn có thể sử dụng thêm một số gia vị sau đây, chúng thường
không bắt buộc nhưng giúp bạn giải quyết một số những vấn đề thường gặp trong Microservices.

### Distributed Tracing

Một vấn đề lớn khi bạn sử dụng kiến trúc Microservices đó là việc có quá nhiều kịch bản và khi có Bug,
bạn không thể Debug cả hệ thống được. Có nhiều nguyên nhân của vấn đề này, một trong đó là việc các
Service giao tiếp với nhau qua Network, thì Distributed Tracing sẽ giải quyết vấn đề này bằng cách
truy vết các request hết một vòng dời của request đó. Tất nhiên việc này sẽ làm chậm request được gửi
tới nên thường Distributed Tracing đi kèm với khả năng cấu hình phần trăm request được truy vết.

### Circuit Breaker

Đây là cầu giao của hệ thống, chúng giải quyết vấn đề về kịch bản khi có một Service bị lỗi và ngừng
hoạt động. Tuy là các Service độc lập nhưng việc các Service đột ngột không gọi cho nhau được cũng
gây ra nhiều kịch bản mới, thì Circuit Breaker giúp bạn handle bớt kịch bản liên quan tới việc
Service được gọi tối ngưng hoạt động.

## So sánh

Thường khi nhắc tới so sánh kiến trúc Microservices thì ta sẽ nghĩ ngay tới Monolith, điều này cũng
không lạ lắm vì 2 kiến trúc này hoàn toàn ngược nhau vầ việc so sánh sẽ dễ làm bật ra tính chất
của cả 2.

### Microservices

#### Điểm mạnh

Khả năng Scale là thứ mà chắc là nhiều bạn cũng nghe quảng cáo rồi, thì kiến trúc Microservices làm
điều này rất là tốt, mỗi Service độc lập nhau nên đóng gói thành Container dễ dàng. Về mặt thay đổi
tính năng cũng tương đối dễ dàng khi chỉ cần tạo một Service mới bên cạnh các Service cũ và điều
hướng người dùng từ từ qua tính năng mới thay vì phải dóng Website để bảo trì.

#### Điểm yếu

Việc tạo nhiều Service như vậy khiến chạy sản phẩm dưới Local tương đối khó khăn, nếu bạn sử dụng
Java Spring Boot thì sẽ bị choáng với lượng Ram mà cả hệ thống cần do mỗi Service lại cần 1 JVM
riêng, Garbage Collector riêng. Do các ngôn ngữ đều tối ưu cho chính Project biên dịch thôi, nên
việc chạy hệ thống gồm nhiều Project sẽ tốn nhiều tài nguyên hơn chạy mốt Project lớn. CI/CD cho
Microservices cũng tốn thời gian nhiều hơn và từ đó chi phí vận hành hệ thống cũng tăng lên.

Việc các Service giao tiếp với nhau qua Network cũng tăng độ Deplay của hệ thống khi xử lý Request
của Client. Ngoài ra cách giao tiếp này cũng rất khó Debug cũng như tìm ra lỗi, khi một Request có
thể phải đi qua nhiều Service tạo ra nhiều kịch bản khác nhau.

## Tổng kết thôi

Bài viết đầu tiên trong Series mang tính chủ yếu là thảo luận về Microservices, trả lời một số
câu hỏi có thể các bạn thắc mắt. Cùng như giới thiệu một vài khái niệm sẽ được làm rõ hơn trong
những bài viết sau.
