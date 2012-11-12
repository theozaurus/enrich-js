describe("Enrich", function(){

  var klass = com.jivatechnology.Enrich;
  var subject;

  describe("instantiation", function(){

    it("should not require any parameters", function(){
      var result = new klass();

      expect( result ).toBeInstanceOf(klass);
    });

  });

  describe("instance method", function(){

    beforeEach(function(){
      subject = new klass();
    });

    describe("#add", function(){

      it("should allow a function to be added", function(){
        var fun = function(){};
        subject.add("hello", fun);

        expect(subject.list()).toEqual({"hello": fun});
      });

      it("should return it's self so that it can be chained", function(){
        var result = subject.add("hello", function(){});

        expect(result).toBe(subject);
      });

      it("should run it immeditealy if the DOM has been loaded", function(){
        var run = false;

        subject.domLoaded();

        subject.add("hello", function(){ run = true; });

        expect(run).toBeTruthy();
      });

      it("should not run it immeditealy if the DOM has not been loaded", function(){
        var run = false;

        subject.add("hello", function(){ run = true; });

        expect(run).toBeFalsy();
      });

    });

    describe("#run", function(){
      it("should run each callback that has been added", function(){
        var one = false;
        var two = false;

        subject.add("one",function(){ one = true; });
        subject.add("two",function(){ two = true; });

        subject.run();

        expect( one && two ).toBeTruthy();
      });

      it("should pass the DOM element to each callback", function(){
        var returned;
        subject.add("one",function(passed){ returned = passed; });

        subject.run("pretend dom");

        expect( returned ).toEqual( "pretend dom" );
      });

      it("should pass the document to each callback if no dom element specified", function(){
        var returned;
        subject.add("one",function(passed){ returned = passed; });

        subject.run();

        expect( returned ).toEqual( document );
      });

      it("should return it's self", function(){
        var result = subject.run();

        expect(result).toBe(subject);
      });
    });

    describe("#domLoaded", function(){
      it("should run all callbacks with document", function(){
        var returned;
        subject.add("one",function(passed){ returned = passed; });

        subject.domLoaded();

        expect( returned ).toEqual( document );
      });

      it("should not run all callbacks if already loaded", function(){
        var count = 0;
        subject.add("one",function(){ count += 1; });

        subject.domLoaded();
        subject.domLoaded();

        expect( count ).toEqual( 1 );
      });
    });

  });

});
