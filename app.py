from flask import Flask, url_for, render_template, request, send_from_directory

app = Flask(__name__)


# @app.route('/', defaults={'path': ''})
@app.route('/')
def hello_world():
    print(request.method)
    print(request.args)
    print(request.headers)
    print(request.remote_addr)
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET', 'POST'])
def test(path):
    print("path = {}".format(path))
    print("method = {}".format(request.method))
    print("args = {}".format(request.args))
    print("headers = {}".format(request.headers))
    print("remote addr = {}".format(request.remote_addr))
    print("response data = {}".format(request.data))
    return "some string data"


@app.route('/data/<path:path>', methods=['GET', 'POST'])
def test_from_dir(path):
    print('from dir')
    return send_from_directory('data', path)





if __name__ == '__main__':
    app.run()
