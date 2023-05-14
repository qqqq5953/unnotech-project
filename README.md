## 我們該如何執行你完成的專案

- npm install
- npm run dev

## 專案的架構、邏輯說明

專案內分成以下資料夾

- views：存放頁面。專案主要由兩個頁面組成

  - Book List Page（name:"Book"）
  - Book detail page（name:"Detail"）.

  由於沒有首頁，於是將首頁導到 Book List Page

- components：存放元件，分成
  - forms 資料夾：存放表單共用元件
    - InuptText.vue
    - TextArea.vue
    - ErrorDisplay.vue
  - global 資料夾： 存放整個專案共用元件
    - BaseContainer.vue
    - BaseHeader.vue
    - BaseModal.vue
- api：存放 api 相關邏輯
  - index.js：axios 的進入點，使用攔截器
  - modules 資料夾：管理不同功能的 api，在此我是用功能區分而不是用頁面區分，例如：儘管有 Book.vue 及 Detail.vue 兩頁，但因為都跟 book 相關，兩頁面會用到的 api 就都放在 bookApi.js 中
- tools：專案會用到的 helpers
  - 此專案有用到表單驗證
    - validator.js 存放驗證邏輯
    - formHelper.js 存放表單相關邏輯，例如 reset(), validate() 等
- routers：存放路由。
  - index.js：路由進入點
  - book.js：存放 book 相關的路由
- assets：存放 css 及圖片的資料夾

## 說明：

### gloabl 共用元件

- 觀察要求的四個頁面都有 header，於是建立 BaseHeader 元件並開 2 個 slot，方便傳入自定義的 icon 或按鈕樣式
- 觀察四個畫面都有 header 及下方主要顯示內容的區塊 `<main>`，因此建立 BaseContianer 元件，裡面包 BaseHeader 並定義好樣式，就可以讓四個畫面共用
- 觀察詳情、新增、修改頁面的樣式一樣，但其中新增、修改不算頁面，於是選擇用 modal 做，因此建立 BaseModal 元件，而該元件是由 BaseContianer 單獨組成，確保元件一致性。
- 新增頁面的 modal 因為考量到該按鈕可能會被頻繁點擊，因此用 v-show 判斷搭配 `<Teleport>` 顯示。
- 然而，修改頁面我沒有用 modal 做，原因是該頁面是在詳情頁按右上方修改後，畫面最下方只會多出修改按鈕，於是最後決定用 js 判斷是否為修改的狀態，再去顯示按鈕以及允許欄位的編輯，可以減少頁面載入時還要渲染一個 modal 的時間。

## 你對於所有使用到的第三方 library 的理解，以及為何使用它

### 使用 axios 呼叫 api

此專案有用攔截器，其中一個用法是可以在 request 送出前驗證是否有帶 token，或是如果都需要在發 request 前啟用 loading effect 並在取得 response 後關閉，也可以在這裡達成，然而要判斷哪些 api 是需要 loading 的，就得考量該專案的特性。

## 在這份專案中你遇到的困難、問題，以及解決的方法

- Book List 資料不完整，該如何呈現（雖然本測驗沒有要求要秀出圖片，但只是我選擇這麼做而已），以下是缺了的狀況：
  - 只缺圖片
    - 解決方法：自定義 image lost 標示或直接不秀出來
    - 最後選擇秀出來，因為還是知道該書名及作者），但實務上還是要跟團隊討論該如何處理較符合使用者體驗
  - 缺書名及作者：直接篩掉，因為使用者無法獲得該書本資訊
  - 三者都缺：同 B
- 圖片不一樣大：
  - 解決方法：設置固定高度並用 object-contain 讓圖片不會大小不一
- 書本標題過長：
  - 解決方法：用 line-clamp
- 表單驗證：
  - 要如何集中管理驗證的條件，同時因為 input 欄位是共用元件，要如何在驗證的同時不會影響元件的複用性？
  - 因為"標題"與"內容"欄位的條件只有必填，所以原本是將驗證寫在 input 內，後來考量到 inputText.vue 可能會有其他使用情境，且實務上未來可能會新增其他驗證條件（例如最大長度），因此將驗證邏輯定義在畫面而不是元件內。
