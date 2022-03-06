---
title: "Series Microservices: Bắt đầu với Microservice"
date: 2022-03-06T12:51:24+07:00
draft: true
tags: ["microservice"]
image: "/images/man-search-for-meaning.jpg"
creditAuthor: "Sasha  Freemind"
creditAuthorLink: "https://unsplash.com/@sashafreemind?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
creditUnsplash: "https://unsplash.com/s/photos/meaning?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
---

Có lẽ Microservice không còn là một thuật ngữ quá mới đối với Dev nữa khi mà ngày càng nhiều Framework, 
Platform hỗ trợ kiến trúc này. Vì vậy, để các bạn mới bắt đầu với kiến trúc này có thể tìm hiểu về nó,
mình quyết định bắt đầu 1 series nhỏ giới thiệu qua những khái niệm cũng như những thứ hay hó khác.
Nếu bạn đã sẵn sàng thì chúng ta bắt đầu nào.

## Microservice là gì nhỉ?

Khác với những kiến trúc hay những Design Pattern khi mà nó thường bao hàm cách để có thể tự mình implement
lại được. Microservice có vẻ mập mờ hơn, điểm chung lớn nhất của những người nói họ thiết kế hệ thống theo
Microservice là hệ thống giồng rất nhiều Project và chúng dùng api để giao tiếp với nhau.

Sự mập mờ còn từ chữ "micro" nữa, từ này thể hiện là chúng ta cần chia hệ thống thành rất nhiều phần nhỏ,
nhưng nhỏ tới thế nào thì lại không rõ lắm. Chia nhỏ tới từng Function hay từng Class thì có vẻ không ổn lắm,
vậy kiến trúc MVC cũng chia hệ thống thành 3 phần nhỏ hơn thì có thể gọi là Microservice không nhỉ?

Thậm chí nguồn gốc của kiến trúc Microservice cũng rất mập mờ. Khi mà nhiều công ty lớn về lập trình cho
rằng họ đã sử dụng kiến trúc này từ vài thập kỉ về trước, nếu như vậy xem chừng kiến trúc này cũng không
hẳn là đột phá lắm. Vậy lý do nào khiến nó được chú ý ở thời điểm hiện tại như vậy?

Xem chừng dù chưa trả lời được câu hỏi Microservice là gì thì chúng ta đã gặp hàng đống vấn đề khác rồi.
Vì vậy mình nghĩ cách tiếp cận tốt nhất với Microservice là xem những ông lớn trong ngành đang dùng nó
như thế nào. Nổi tiếng nhất có thể kể tới ông lớn Netflix, không chỉ có những Series phim hay, công ty
này cũng dóng góp cho cộng đồng nhiều những Frameword để implement các service trong kiến trúc Microservice.
Họ còn thuyết trình về hệ thống đó nữa, và mình recommend bạn nên xem qua nó để hình dung sơ qua
vấn đề mà Netflix đã giải quyết với kiến trúc Microservervice.

{{< youtube https://www.youtube.com/watch?v=CZ3wIuvmHeM >}}
