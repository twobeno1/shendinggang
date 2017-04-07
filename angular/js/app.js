/**
 * Created by 沈定刚 on 2017/3/5.
 */
var myapp=angular.module("myapp",["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
        // 处理默认首页
            .when("/", {templateUrl: "pages/productList.html", controller: "productsCtrl"})
            .when("/productList", {templateUrl: "pages/productList.html", controller: "productsCtrl"})
            .when("/detail", {templateUrl: "pages/detail.html", controller: "detailCtrl"})
            .when("/detail?:name", {templateUrl: "pages/detail.html", controller: "detailCtrl"})
            .when("/shopCart", {templateUrl: "pages/shopCart.html", controller: "cartCtrl"})
            // 如果请求的路由不存在
            .otherwise({templateUrl: "pages/productList.html", controller: "productsCtrl"});
    })
    // 创建一个代表购物车的service
    .factory("cartService", function () {
        // 容器：相当于购物车的购物筐
        var cart = [];

        return {
            // 添加商品到购物车:商品对象{name:"方便面",price:8.00}
            // 需要判断购物车的数组中，之前是否已经加入过该商品
            // 如果之前已经加入过，则只需要修改购买数量
            add: function (product) {
                // 遍历数组，判断数组中是否有product
                // item:{product:product,number:3}
                for (var i = 0; i < cart.length; i++) {
                    var item = cart[i];
                    if (product.name == item.product.name) {
                        // 说明之前添加过，这里只修改购买数量
                        item.number++;
                        return;
                    }
                }

                // 如果能执行到这里，说明在购物车中没有找到该商品-新商品
                cart.push({product: product, number: 1});
            },
            // 从购物车中删除商品的方法
            remove: function (name) {
                // 遍历数组，判断数组中是否有product
                // item:{product:product,number:3}
                for (var i = 0; i < cart.length; i++) {
                    var item = cart[i];
                    if (name == item.product.name) {
                        // 说明找到了要删除的商品，从数组中删除它
                        cart.splice(i, 1);
                        return;
                    }
                }
            },
            // 查询购物车中所有商品的方法
            findAll: function () {
                return cart;
            },
            // 清空购物车
            clear: function () {
                cart.length = 0;
            }
        };
    })
    // step2: 向主模块注册一个控制器
    // 依赖注入: $http service，以及购物车service
    // 商品列表显示子页面的控制器
    .controller("productsCtrl", function ($scope, $http, cartService) {
        var url = "products.json";
        $http.get(url).success(function (data) {
            $scope.products = data;
        });
        $scope.add = function (product) {
            // 将商品对象加入到购物车中
            cartService.add(product);
        };
    })
    .controller("detailCtrl", function ($scope,$routeParams,cartService) {
        var name = $routeParams["name"] || "小米手机";
        var productList = {
            小米手机:{"name":"小米手机","price":1999,"os":"android","quantity":2,"date":"2016-05-03","imgsrc":"TB1_50x50.jpg"},
            华为手机:{"name":"华为手机","price":3999,"os":"android","quantity":1,"date":"2016-05-03","imgsrc":"TB2_50x50.jpg"},
            苹果手机:{"name":"苹果手机","price":4999,"os":"ios","quantity":1,"date":"2016-05-03","imgsrc":"TB3_50x50.jpg"},
            三星手机:{"name":"三星手机","price":999,"os":"android","quantity":3,"date":"2016-05-03","imgsrc":"TB4_50x50.jpg"},
            vivo手机:{"name":"vivo手机","price":2999,"os":"android","quantity":2,"date":"2016-05-03","imgsrc":"TB1_50x50.jpg"}
        };

        // 根据传递的参数(商品名称)获取对应的商品信息
        $scope.product = productList[name];

        $scope.add = function () {
            // 将商品对象加入到购物车中
            cartService.add($scope.product);
        };
    })
    .controller("cartCtrl", function ($scope, cartService) {
        // 拿到购物筐中的所有商品
        $scope.cart = cartService.findAll();

        // 删除购物车中商品的方法
        $scope.remove = function (name) {
            cartService.remove(name);
        };

        // 统计购买总数量
        $scope.count = function () {
            var total = 0;
            angular.forEach($scope.cart, function (item) {
                total += item.number;
            });
            return total;
        };

        // 计算购买总金额
        $scope.money = function () {
            var total = 0;
            angular.forEach($scope.cart, function (item) {
                total += item.number * item.product.price;
            });
            return total;
        };
    });