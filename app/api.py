from flask import(
    Blueprint, g, render_template, request, session, url_for
)

bp = Blueprint('api', __name__)


@bp.route('/api')
def api():
    return {"json": "delivered"}
