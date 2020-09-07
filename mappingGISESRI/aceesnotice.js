//>>built
define(
    'arcgisonline/pages/utils/accessNotice',
    'require exports tslib arcgisonline/esriGeowConfig arcgisonline/sharing/util dojo/cookie'.split(
        ' '
    ),
    function(e, f, a, c, b, d) {
        c = a.__importDefault(c);
        b = a.__importDefault(b);
        d = a.__importDefault(d);
        return (function() {
            function a() {}
            a.checkSettings = function() {
                return b.default
                    .request({
                        url: c.default.restBaseUrl + 'portals/self/settings',
                        content: { f: 'json' },
                    })
                    .then(
                        function(a) {
                            var b;
                            if (
                                null === (b = a.anonymousAccessNotice) || void 0 === b ?
                                0 :
                                b.enabled
                            ) {
                                if (d.default('ago_conditions_accepted'))
                                    return {
                                        redirected: !1,
                                        response: a,
                                    };
                                window.location.href =
                                    c.default.baseUrl +
                                    'pages/Account/accept_conditions.html#client_id\x3darcgisonline\x26redirect_url\x3d' +
                                    window.location.href;
                                return { redirected: !0 };
                            }
                            return { redirected: !1, response: a };
                        },
                        function() {
                            return { redirected: !1 };
                        }
                    );
            };
            return a;
        })();
    }
);