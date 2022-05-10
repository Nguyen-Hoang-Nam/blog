---
title: "Refresh Token Rotation với Spring Boot và WebFlux (part 1)"
description: "Nếu bạn từng làm việc với Spring Boot và Spring Security thì hẳn bạn không còn lạ gì với JWT, nhưng bạn đã từng thử Refresh Token Rotation và WebFlux chưa? Mình thì rồi và phải nói là gặp tương đối nhiều khó khăn, tài liệu không nhiều, ít implement hay example để dựa theo. Nên mình hi vọng một bài viết nho nhỏ về cách mình implement có thể giúp các bạn đến sau setup thử với stack khá thú vị này này."
date: 2022-05-10T12:51:24+07:00
draft: false
tags: ["JWT", "Authentication", "Spring Boot", "WebFlux"]
creditAuthor: "JuniperPhoton"
creditAuthorLink: "https://unsplash.com/es/@juniperphoton?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
creditUnsplash: "https://unsplash.com/s/photos/enter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
isPost: true
---

Nếu bạn từng làm việc với Spring Boot và Spring Security thì hẳn bạn không còn lạ gì với JWT, nhưng bạn đã từng thử Refresh Token Rotation và WebFlux chưa? Mình thì rồi và phải nói là gặp tương đối nhiều khó khăn, tài liệu không nhiều, ít implement hay example để dựa theo. Nên mình hi vọng một bài viết nho nhỏ về cách mình implement có thể giúp các bạn đến sau setup thử với stack khá thú vị này này.

<!--more-->

## Refresh Token Rotation là gì ấy bạn ơi?

Để hiểu rõ kĩ thuật này, bài toán mà nó giải quyết cũng như ý tưởng thì mình nghĩ nên bắt đầu bằng việc nói sơ qua JWT và Refresh Token, bạn nào nắm được rồi có thể [phần 2]() nha.

### JWT (JSON Web Token) [1]

Đây là một phương thức để Authorize và Authenticate nhưng khác với những phương pháp truyền thống như Session Cookie là Stateful, JWT được thiết kế để Stateless. Để thực hiện điều này, JWT sử dụng Token, đây là một mã khóa hai chiều (có thể giải mã được) của một chuỗi JSON. Token này được duy nhất Frontend lưu và được gửi kèm trong mọi request (trừ White list) để Backend Authentication.

Ok, ok mình nghĩ các bạn cũng đã hiểu ý tưởng rồi, nhưng các bạn có thử đặt câu hỏi tại sao ta lại cần phải rắc rối như vậy không nhỉ?

- Stateless, giúp hệ thống sử dụng kiến trúc Microservice đễ dàng scale hơn, loose coupling giữa Backend và Frontend.
- Khác với Session Cookie khi chỉ cần sinh một chuỗi ngẫu nhiên, Token lại là một mã khóa hai chiều để phía Backend có thể giải mã được nên sẽ không cần lưu trữ chúng dưới DB.

#### Implementation 1

![Implement 1](implement1 "Implement 1")

Trong cách làm này, ta dơn giản là cho request login, signup vào White list của Middleware và không cần kiểm tra Access Token. Sau khi login thành công, ta sẽ mã hóa một chuỗi có cấu trúc và gửi cho Frontend để lưu vào browser (ví dụ local storage). Từ thời điểm này, mỗi khi Frontend gửi một request nào tới Backend đều sẽ kèm theo Token và khi Backend nhận được sẽ thử parse Token này ra nếu parse ra được dạng chính xác thì sẽ xác nhận request này.

**Vấn đề**

- Nếu mã hóa dơn giản một chuỗi hợp lệ thì sẽ đễ bị kẻ đột nhập generate ra một mã tương như vây, khi đó Backend sẽ nhận nhầm Access Token của kẻ gian là hợp lệ.
- Token nếu theo phương thức trên sẽ là long live nghĩa là nếu ai đó vô tình lấy được sẽ có thể gửi request vào Backend không giải hạn thời gian.

**Hướng giải quyết**

- Để giải quyết vấn đề này thì JWT sẽ bao gồm Signature chứa Secret để mã hóa cùng. Kẻ đột nhập từ đó sẽ khó khăn trong việc generate ra một chuối Token hợp lệ nếu không biết Secret.
- Đối với vấn đề còn lại thì tương tự như Session Cookie JWT có phần Payload với claim exp để thêm thông tin về thời gian hết hạn của Token này.

### Refresh Token

Với cách giải quyết ở trên ta sẽ gặp vấn đề là Access Token tạo ra sẽ bị expired, để bảo mật ta thường cho thời gian này khá nhỏ 1 ngày hoặc 1 tháng khiến người dùng sẽ bị văng khỏi ứng dụng và phải đăng nhập lại,. Như vậy, sẽ làm giảm đáng kể trải nghiệm của người dùng. Từ đó đẫn tới khái niệm Refresh Token là một loại token được generate ngẫu nhiên và được lưu vào DB, mục đích của loại token này là để Frontend dùng với mục đích tạo ra một Access Token mới.

Như vậy Refresh Token sẽ tương tự như Session Cookie, đó là lý do ta ko dùng mã 2 chiều trong trường hợp này. Cũng vì lý do này nên Best Practice là khi dùng Refresh Token là thay vì response trong body như Access Token thì sẽ được truyền trên header tương tự Cookie với `httponly`.

#### Implementation 2

![Implement 2](implement2 "Implement 2")

Khi khách hàng login thành công, Backend không chỉ gửi Access Token mà còn cả Refresh Token. Sau đó Frontend sẽ chủ động lưu cả 2 Token này vào browser nhưng mỗi khi gọi request thì Frontend sẽ chỉ gửi kèm Access Token tương tự như Implementation 1. Khi Frontend gửi request và Backend kiểm tra thấy là Access Token đã hết hạn thì sẽ trả lỗi để Frontend nhận biết. Khi này Frontend sẽ dùng Refresh Token để gửi request (nằm trong White list) yêu cầu cấp một cái Access Token mới.

**Vấn đề**

- Refresh Token như vậy sẽ trở thành long live và nếu kẻ đột nhập lấy được sẽ có toàn quyền tạo ra Access Token mới dùng truy cập trái phép vào Backend.

### Refresh Token Rotation

Vấn đề trên gồm 2 ý và ta sẽ giải quyết từng ý một, Refresh Token là long live và kẻ đột nhập dùng để tạo Access Token. Với ý một, ta sẽ giảm tuổi thọ của Refresh Token bằng cách khi Frontend gửi Refresh Token nhằm lấy Access Token mới thì Backend sẽ tạo ra một Refresh Token mới kèm với Access Token mới để trả lại. Đồng thời Refresh Token cũ sẽ bị vô hiệu hóa (không nhất thiết phải xóa trong DB). Như vậy lifetime của Refresh Token sẽ đồng thời hết khi Access Token hết hạn.

#### Implementation 3

![Implement 3](implement3 "Implement 3")

Với hướng giải quyết này ta sẽ chặn được kẻ đột nhập sử dụng lại Refresh Token. Nhưng khi kẻ đột nhập sử dụng Refresh Token trước khi Access Token hết hạn và nhận một Refresh Token mới, trong khi đó khách hàng đợi Access Token hết hạn mới gọi và sẽ không thành công do Refresh Token đã bị vô hiệu hóa.

#### Implementation 4

![Implement 4](implement4 "Implement 4")

Để giải quyết cả kịch bản này ta vẫn sẽ vô hiệu hóa Refresh Token nhưng để chặn kẻ đột nhập ta sẽ đồng thời vô hiệu hóa Refresh Token của kẻ đột nhập sau khi được tạo mới. Nghĩ là ta sẽ lưu lịch sử của Refresh Token bắt đầu thì khi được tạo khi đăng nhập và cả những Refresh Token sau được sinh ra khi gọi API generate Access Token mới và Refresh Token mới. Khi một phần tử trong lịch sử này khác cái mới nhất bị gọi lại thì ta sẽ vô hiệu hóa hoàn toàn tất cả Refresh Token trong chuỗi này.

**Vấn đề**

- Ở trong kịch bản trên ta chỉ giả sử là kẻ đột nhập bằng cách nào đó lấy được Refresh Token (read) nhưng trong thực tế có những kĩ thuật mà kẻ đột nhập có thể lưu Refresh Token và Access Token mới vào lại browser của khách hàng (write). Khi này lịch sử của Refresh Token sẽ không bị lặp lại.

### Beyond

Vấn đề trong cách Implementation 4 tương đối khó giải quyết vì có giả thuyết tương đối mạnh, với cả khả năng read và write, kẻ đột nhập có thể xem là ngang hàng với người dùng và không thể phát hiện được. Vì vậy những ông lớn trong ngành về Microservice như Netflix đã sử dụng cơ chế Backend for Frontend (BFF). Nghĩa là thay vì chỉ có Frontend và Backend thì sẽ có thêm một một Backend nhỏ nằm giữa với nhiệm vụ duy nhất là lưu Refresh Token và Access Token đồng thời nhận request của Frontend, thêm Token và gửi tới Backend.

## Kết luận

Trong phần một của bài viết này mình đã trình bày phần lý thuyết của Refresh Token Rotation và lý do vì sao ta cần phải làm như vậy, trong phần kế mình sẽ đi implement cơ chế này trong Spring Boot và WebFlux.

## Tài liệu tham khảo

- [1] [https://datatracker.ietf.org/doc/html/rfc7519](https://datatracker.ietf.org/doc/html/rfc7519)
- [2] [https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
- [3] [https://www.pingidentity.com/en/resources/blog/posts/2021/refresh-token-rotation-spa.html](https://www.pingidentity.com/en/resources/blog/posts/2021/refresh-token-rotation-spa.html)
- [4] [https://levelup.gitconnected.com/secure-jwts-with-backend-for-frontend-9b7611ad2afb](https://levelup.gitconnected.com/secure-jwts-with-backend-for-frontend-9b7611ad2afb)
