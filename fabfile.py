
import os
import glob
import hashlib
import datetime
from fabric.api import local


def upload(filename):
    now = datetime.datetime.now()

    with open(filename) as f:
        hsh = hashlib.md5(f.read()).hexdigest()[:6]

    name = '%s.%s' % (now.strftime('%Y%m%d'), hsh)
    name = name + os.path.splitext(filename)[1]
    local('qboxrsctl put -c python qingcheng/%s %s' % (name, filename))


def js():
    upload('dist/qingcheng.js')


def css():
    upload('dist/qingcheng.css')


def assets():
    js()
    css()


def fonts():
    for name in glob.glob('dist/fonts/*'):
        key = name.replace('dist', 'qingcheng')
        local('qboxrsctl put -c python %s %s' % (key, name))
