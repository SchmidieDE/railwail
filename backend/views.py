# example/views.py
from datetime import datetime

from django.http import HttpResponse

def index(request):
    now = datetime.now()
    
    html = f'''
    <html>
        <body>
            <h1>Hello from Philipp!</h1>
            <div>
            </div>
            <p>The current time is { now }.</p>
        </body>
    </html>
    '''
    return HttpResponse(html)