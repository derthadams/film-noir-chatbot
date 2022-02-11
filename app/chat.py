from flask import(
    Blueprint, g, render_template, request, session, url_for
)

bp = Blueprint('chat', __name__)


@bp.route('/', defaults={'path': ''})
@bp.route('/<path:path>')
def index(path):
    return render_template('chat/index.html') # noqa
