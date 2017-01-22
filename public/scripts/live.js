"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function UserRow(props) {
	console.log(props);
	return React.createElement(
		"tr",
		null,
		React.createElement(
			"td",
			null,
			props.index
		),
		React.createElement(
			"td",
			null,
			React.createElement(
				"a",
				{ href: "https://www.freecodecamp.com/" + props.user.username, target: "_blank" },
				props.user.username
			)
		),
		React.createElement(
			"td",
			null,
			props.user.recent
		),
		React.createElement(
			"td",
			null,
			props.user.alltime
		)
	);
}

function UserRows(props) {
	var users = props.users;
	return React.createElement(
		"tbody",
		null,
		users.map(function (user, index) {
			return React.createElement(UserRow, { key: user.username,
				user: user,
				index: index });
		})
	);
}

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.state = {
			users: []
		};
		return _this;
	}

	_createClass(App, [{
		key: "setUsers",
		value: function setUsers(response) {
			this.setState({ users: response.data });
			console.log(this.state);
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			var app = this;

			//strangly, the recent and alltime URLS return the same users, just ordered differently.
			//So we only need one call to get all the data
			axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function (response) {
				app.setUsers(response);
			});
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"table",
				{ id: "App" },
				React.createElement(
					"thead",
					null,
					React.createElement(
						"tr",
						null,
						React.createElement(
							"th",
							null,
							"#"
						),
						React.createElement(
							"th",
							null,
							"Camper Name"
						),
						React.createElement(
							"th",
							null,
							"Recent Points"
						),
						React.createElement(
							"th",
							null,
							"Alltime Points"
						)
					)
				),
				React.createElement(UserRows, { users: this.state.users })
			);
		}
	}]);

	return App;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));