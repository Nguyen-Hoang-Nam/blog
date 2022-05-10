---
title: "Cùng nhau chặn Spam bằng Python nào"
description: "Trong bài viết
nhỏ này, mình sẽ hướng dẫn cách để tạo ra một hệ thống chống Spam nho nhỏ. Mình thấy bài viết cũng rất phù hợp với các
bạn muốn tìm hiểu về xử lý ngôn ngữ tự nhiên (NLP)."
date: 2022-03-10T10:00:00+07:00
draft: false
tags: ["Spam", "Python", "ML", "NLP"]
creditAuthor: "James Kern"
creditAuthorLink: "https://unsplash.com/@jamesrkern?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
creditUnsplash: "https://unsplash.com/s/photos/spam?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
isPost: true
---

"Bạn vừa trúng một chiếc IPhone", "Ban là người may mắn thứ 101" những câu nói này nghe quen với bạn chứ. Trong bài viết nhỏ này, mình sẽ hướng dẫn cách để tạo ra một hệ thống chống Spam nho nhỏ. Mình thấy bài viết cũng rất phù hợp với các bạn muốn tìm hiểu về xử lý ngôn ngữ tự nhiên (NLP).

<!--more-->

Để bạn có thể đọc bài viết một cách hiệu quả nhất việc biết 1 chút Python cũng như Google Colab chắc chắn là một lợi thế. Nếu không thì các bạn cũng yên tâm, mình sẽ giải thích kĩ từng phần.

## Một chút chuẩn bị

Đối với các bạn nào chưa từng thử xử lý ngôn ngữ tự nhiên, thì mình nghĩ phần này có thể cho bạn một vài cái nhìn tổng quát về những thứ mình chuẩn bị làm. Với các bạn đã nắm sơ ý tưởng, ta có thể xem từ chương kế tiếp.

Trước hết cùng mình phân tích đề tài này nha. Việc chặn Spam thực chất quy về việc xác định một đoạn Text là Spam. Oki, có vẻ hợp lý nhưng làm sao để xác định đây là Spam nhỉ? Thì xác định Spam có thể hiểu là phần dữ liệu thành những tin nhắn Spam và không Spam (mà mình tạm gọi là Ham).

Oki vậy chắc bạn sẽ thắc mắc thế nào là Spam, nào là Ham. Thú thật mình cũng không có câu trả lời đâu 😅, mà thực ra việc hệ thống bạn xác định đó Spam hay không phụ thuộc vào việc đánh nhãn mà mình sẽ nói ở dưới, nên nếu bạn cần tìm tiêu chí để xác định Spam hay Ham thì bạn có thể hỏi người đánh nhãn nha 😅. Vì vậy có cơ hội bạn nên trưc tiếp thu nhập dữ liệu và đánh nhãn nha.

Để thực hiện việc phân loại dữ liệu dạng Text thì xử lý ngôn ngữ tự nhiên thường theo một quy trình như sau:

![Diagram 1](diagram1 "Quy trình xử lý ngôn ngữ tự nhiên đơn giản")

Cùng mình đi qua cái quy trình này xíu nha. Thu thập dữ liệu, đây là bước tiên quyết mà bạn cần phải làm, lý do là vì dữ liệu là đầu vào của việc huấn luyện. Đánh nhãn, đây cũng là một bước cực kì quan trọng, do dữ liệu bạn thu nhập được ở bước 1 không đủ thông tin để có thể Training được, nó cũng giống như bạn in sách giáo khoa và bỏ hết đề mục vậy.

Tin mình đi, nếu bạn làm được 2 bước này là bạn đã làm hết những việc nặng rồi đó do nó thường tốn rất nhiều thời gian. Vì lý do này những trang Web lưu dữ liệu được đánh nhãn sản ra đời như [Kaggle](https://www.kaggle.com/), nhờ đó giảm bớt thời gian khi bạn cần thực hiện những Task đơn giản.

Ta tiếp tục với việc tiền xử lý, dù dữ liệu đã được đánh nhãn, thông tin trong dữ liệu đó vấn chứa những thông tin nhiễu cũng như đôi khi dữ liệu quá lớn cũng làm chậm quá trình huấn luyện. Tiền xử lý giúp ta loại bớt thông tin không cần thiết từ đó đạt được dữ liệu tốt hơn cũng như nhẹ hơn.

Từ nãy tới giờ, chúng ta vẫn chưa hề liên kết các thông tin lại với nhau, các đoạn Text đối với máy tính đều rời rạc nhau. Để giải quyết vấn đề này ta cần làm bước trích xuất dữ liệu mà thực chất là liên kết các từ cũng như các đoạn Text với nhau để tìm ra đặc trưng. Ngoài việc tìm đặc trưng thì ta cũng cần cái đầu ra là những Vector để có thể tiếp tục bước kế tiếp.

Bước cuối cùng có vẻ khó nhất nhưng thực ra ta thường thực hiện rất nhanh đó là việc phân loại dựa vào đặc trưng mà ta tìm được ở bước trên.

## Bắt đầu thôi

### Chuẩn bị dữ liệu có nhãn

Như mình có đề cập ở trên bước này sẽ tốn tương đối nhiều thời gian, nên mình sẽ dùng một bộ dữ liệu có sẵn nha, nhưng mình chưa tìm thấy bộ dữ liệu có sẵn Tiếng Việt nên ta dùng bộ dữ liệu Tiếng Anh nha. Bạn truy cập vào link sau [Kaggle](https://www.kaggle.com/uciml/sms-spam-collection-dataset), tải về rồi upload lại lên Drive của bạn nha. Xong bước trên thì cùng mình tới phần code nào.

```python
from google.colab import drive
drive.mount('/content/drive')
```

Dòng Code này sẽ giúp bạn liên kết Colab và Drive của bạn vì bạn đang lưu bộ dữ liệu trên Drive. Sau đó cùng mình xem qua một vài dòng trong dự liệu nha.

```python
sms = pd.read_csv(
    "/content/drive/MyDrive/Dev/Spam/spam.csv", encoding="latin-1"
)
sms = sms.drop(["Unnamed: 2", "Unnamed: 3", "Unnamed: 4"], axis=1)
sms = sms.rename(columns={"v1": "label", "v2": "message"})
sms.head(10)
```

![Table 1](table1 "10 dòng đầu tiên của bộ dữ liệu")

### Tiền xử lý

#### Bỏ đấu câu nha

Bước đầu tiên trong quá trình, mình nghĩ chúng ta nên bỏ đấu câu do nội dung tin nhắn Spam thường vẫn được giữ nguyên khi bỏ dấu câu đi. Ảnh hưởng lớn nhất của quyết định này là thay đổi ngữ pháp của câu điều mà điều mà ta không xét tới trong bài toán này.

```python
import string
text = text.translate(text.maketrans('', '', string.punctuation))
```

Mình giải thích xíu nha, hàm `maketrans` thường đi chung với hàm `translate` để thay thế các kí tự với tham số đầu tiên là kí tự cần đổi, tham số kế là kí tự được đổi thành và tham số cuối là kí tự cần loại bỏ. Còn `string.punctuation` sẽ cho ta một chuỗi các đấu câu như sau `` !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ ``

#### Bỏ Stop Words

Bước thứ 2 thì không hiển nhiên lắm, Stop Words là các từ ít hỗ trợ nghĩa trong câu, chúng đôi khi đóng góp vào ngữ pháp cho câu, đôi khi dùng để mang sắc thái biểu cảm. Nhưng chủ yếu là chúng không làm thay đổi quá nhiều nội dung của câu khi có hoặc không có chúng, điều đó giúp ta có thể làm tập dữ liệu gọn hơn, Training nhanh hơn nhưng vẫn cho kết quả tốt.

```python
import nltk

nltk.download("stopwords")

text = [
    word
    for word in text.split()
    if word.lower() not in stopwords.words("english")
]
```

Trong đoạn code ở trên thì 2 dòng đầu có nhiệm vụ load danh sách Stop Words cho bạn. Một lưu ý nhỏ cho bạn là danh sách Stop Words thường không duy nhất, do đó nếu bạn tìm thấy một danh sách khác thì bạn cũng thử nha biết đâu sẽ cho một kết quả tốt hơn.

### Trích xuất đặc trưng

Khác với quá trình tiền xử lý, bước này thường ảnh hưởng rất lớn tới kết quả cũng như việc chọn thuật toán ở dưới để phân loại. Do bài viết này mang tính giới thiệu thôi nên mình sẽ chọn phương pháp TF-IDF để rút trích đặc trưng.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split

vectorizer = TfidfVectorizer()
tfidf_features = vectorizer.fit_transform(text_feat)

features_train, features_test, labels_train, labels_test = train_test_split(
    tfidf_features, labels, test_size=0.3, random_state=111
)
```

Chi tiết phương pháp TF-IDF mình nghĩ xứng đáng có một bài viết riêng nền mình sẽ không trình bày ở đây. Trong đoạn Code thì 2 dòng đầu sử dụng thư viện `sklearn` để lấy hàm `TfidfVectorizer` và một hàm khác làm nhiệm vụ tách tập đặc trưng thành 2 để Train và Test. Tiếp theo đó t gọi hàm `TfidfVectorizer` và hàm `fit_transform` để chuyển dữ liệu dạng những dòng chữ thành Vector. Cuối cùng ta phân các Vector đặc trưng này thành Train và Test.

### Phân loại

Oki bước cuối rồi nè, khác với những bước trên bước này có khá nhiều cách thực hiện chúng khác nhau chủ yếu ở thuật toán được cài đặt. Thực tế cho thấy với các rút trích đặc trưng bằng TF-IDF thì thuật toán phân loại Naive Bayes cho kết quả tốt nhất. Nên trong phần này mình sẽ sử dụng thuật toán này nha.

```python
from sklearn.naive_bayes import MultinomialNB

mnb = MultinomialNB(alpha=0.2)
mnb.fit(feature_train, labels_train)
pred = mnb.predict(features_test)
pred_scores = [accuracy_score(label_test, pred)]
```

Các bạn chắc cũng nắm được dòng đầu rồi ha, nó lấy cho ta hàm `MultinomiaNB` mà dễ hiểu là thuật toán Naive Bayes. Ở phần kế ta khởi tạo thuật toán với tham số `alpha=0.2`, hàm `fit` giúp thuật toán sử dụng đặc trưng mà bạn rút trích để Train thuật toán và hàm `predict` sẽ giúp bạn chạy thuật toán sau khi Train với dữ liệu Test. Đòng cuối giúp mình tính kết quả của thuật toán dự đoán và kết quả đúng của dữ liệu Test từ đó ta có thể tiếp tục cải tiến.

## Chốt sổ nào

Phù, cuối cùng cũng hết rồi các bạn à. Bài viết này mình đi sâu và mình nghĩ chắc chắn các bạn sẽ có rất nhiều câu hỏi muốn được giải đáp, vì vậy hãy chờ đón những bài viết tiếp của mình về chủ đề này nha.
