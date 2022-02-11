from flask import Flask


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_mapping(SECRET_KEY='dev')

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    from . import api, chat
    app.register_blueprint(api.bp)
    app.register_blueprint(chat.bp)

    return app
