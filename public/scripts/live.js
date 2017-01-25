"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function UserRow(props) {

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

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function SortHeader(props) {
	var sortName = capitalize(props.sort);
	var classes = "sort-by";
	if (props.sort === props.sortBy) {
		classes += " " + props.order;
	}
	return React.createElement(
		"th",
		{ id: "sort-" + props.sort, className: classes, onClick: function onClick() {
				return props.onClick(props.sort);
			} },
		sortName,
		" Points"
	);
}

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.state = {
			users: [],
			sortBy: 'recent',
			order: 'asc'
		};
		return _this;
	}

	_createClass(App, [{
		key: "setUsers",
		value: function setUsers(response) {
			//console.log(response.data);
			this.setState({ users: response.data });
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
		key: "handleClick",
		value: function handleClick(sort) {
			var newOrder = 'asc' === this.state.order ? 'desc' : 'asc';
			var sortedUsers = [];
			if (newOrder === 'asc') {
				if (sort === 'recent') {
					sortedUsers = this.state.users.sort(function (a, b) {
						return b.recent - a.recent;
					});
				} else {
					sortedUsers = this.state.users.sort(function (a, b) {
						return b.alltime - a.alltime;
					});
				}
			} else {
				if (sort === 'recent') {
					sortedUsers = this.state.users.sort(function (a, b) {
						return a.recent - b.recent;
					});
				} else {
					sortedUsers = this.state.users.sort(function (a, b) {
						return a.alltime - b.alltime;
					});
				}
			}

			this.setState({ users: sortedUsers, sortBy: sort, order: newOrder });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

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
						React.createElement(SortHeader, {
							sort: 'recent',
							sortBy: this.state.sortBy,
							order: this.state.order,
							onClick: function onClick(sort) {
								return _this2.handleClick(sort);
							} }),
						React.createElement(SortHeader, {
							sort: 'all',
							sortBy: this.state.sortBy,
							order: this.state.order,
							onClick: function onClick(sort) {
								return _this2.handleClick(sort);
							} })
					)
				),
				React.createElement(UserRows, { users: this.state.users })
			);
		}
	}]);

	return App;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));