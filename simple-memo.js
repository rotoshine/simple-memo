var Memos = new Mongo.Collection('memos');

if (Meteor.isClient) {
  // Template.템플릿_이름.helpers 함수를 통해 template에서 사용되는 각종 변수 및 함수들을 제공할 수 있다.
  Template.Memo.helpers({
    memoCount: function(){
      return Memos.find().count();
    },
    hasMemo: function(){
      return Memos.find().count() > 0;
    },
    memos: function(){      
      return Memos.find({});
    }
  });
  
  // Template.템플릿_이름.events 함수를 통해 template에 각종 이벤트를 바인딩한다.
  // 'event이름 selector' : 실행항 이벤트
  // 형식으로 작성하면 된다.  
  Template.Memo.events({
    'click .remove-memo': function(){
      // 삭제 후 별다른 처리를 하지 않아도 기존에 렌더링 된 memo들이 알아서 다시 렌더링 됨.
      Memos.remove(this._id);
    }
  });
  
  Template.newMemo.events({
    'submit .new-memo': function (event) {
      var memoContent = event.target.newMemo.value;
      
      if(memoContent.length > 3){
        // 데이터 insert 후 view쪽에서 별도로 find하는 처리를 하지 않아도 알아서 view가 갱신된다.
        Memos.insert({
          content: memoContent,
          createAt: new Date()
        });
        event.target.newMemo.value = '';
      }else{
        alert('메모는 4글자 이상 적어주세요.');
      }      
      
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
}
