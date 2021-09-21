import psutil
from datetime import datetime,timezone
from elasticsearch import Elasticsearch
es = Elasticsearch()





def processes():
    global es
    cpu_percent = 0
    memory_percent = 0
    l = dict(psutil.virtual_memory()._asdict())
    toatl_space  = l ['total']
    cpu_percent= psutil.cpu_percent()
    memory_percent= psutil.virtual_memory().percent
    es.index(index="total_usage_",body={"timestamp1":datetime.now(timezone.utc),"cpu_percent":cpu_percent,"memory_percent":memory_percent})



    
    for proc in psutil.process_iter():
       

       
            data1 =  {
            "process_name":proc.name(),
            "cpu_percent":proc.cpu_percent(),
            "timestamp1":datetime.now(timezone.utc),
            "space":(proc.memory_info().vms/toatl_space)*100
            }
            output = es.index(index="ppp_",id=proc.pid,body=data1)
            
       
    




if __name__ == "__main__":
    while(1):
   
	    processes()
	
		
