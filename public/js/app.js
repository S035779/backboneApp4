(function(){
   var Memo = Backbone.Model.extend({
      idAttribute: "_id",
      defaults: {
         content: ""
      }
   });
   var MemoList = Backbone.Collection.extend({
      model: Memo,
      url: "/memo"
   });
   var memoList = new MemoList();
   console.log("Before memoList.length: " + memoList.length);
   // RESTful sample 4-1
   //var memo = memoList.create({content: "Mamo1"},{
   //  success: function() {
   //      console.log("After create model: " + JSON.stringify(memoList));
   //      console.log("After create collection.length: " + memoList.length);
   //   }
   //});
   //console.log("After model: " + JSON.stringify(memo));
   //console.log("After collection.length: " + memoList.length);
   // RESTful sample 4-2
   var memo = new Memo({content: "Mamo2"},{collection: memoList});
   memo.save(null, {
      success: function() {
         console.log("POST: https://localhost:3000/memo");
         console.log("After save memoList: " + JSON.stringify(memoList));
         console.log("After save memoList.length" + memoList.length);
      }
   }).pipe(function(){
      return memoList.fetch({
         success: function() {
            console.log("GET: https://localhost:3000/memo");
            console.log("After fetch memoList: " + JSON.stringify(memoList));
            console.log("After fetch memoList.length: " + memoList.length);
         }
      });
   }).pipe(function(){
      var tempMemo = memoList.find(function(item) {
         return item.get("content") === "Mamo2";
      });
      return tempMemo.save({content: "Mamo3"},{
         success: function() {
            console.log("PUT: https://localhost:3000/memo");
            console.log("After save memoList: " + JSON.stringify(memoList));
            console.log("After save memoList.length: " + memoList.length);
         }
      });
   }).done(function(){
      var tempMemo = memoList.find(function(item) {
         return item.get("content") === "Mamo3";
      });
      return tempMemo.destroy({
         success: function() {
            console.log("DELETE: https://localhost:3000/memo:id");
            console.log("After destroy memoList: " + JSON.stringify(memoList));
            console.log("After destroy memoList.length: " + memoList.length);
         }
      });
   });
   memoList.add(memo);
   console.log("After add memo: " + JSON.stringify(memo));
   console.log("After add memoList.length: " + memoList.length);
}());
