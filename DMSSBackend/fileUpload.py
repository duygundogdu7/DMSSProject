import base64
import csv
import pandas as pd
from pymongo import MongoClient


client = MongoClient('localhost', 27017)
db = client['DMSS']
#data = "U3RhdHVzQ29kZSxTdGF0dXMsRHVydW0sS2ltZGVuLFlldGtpLELDtmxnZSxCw7ZsZ2VEZXRheSzEsGxhblRhcmloLFlhcMSxbMSxLEXFn3lhbMSxLEZpeWF0LFBhcmEsQsO2bMO8bSxtMizFnmlya2V0LExpbmssTm8sRGFuxLHFn21hbi9TYWhpcCxDZXBUZWwsRGnEn2VyVGVsLEthdFNhecSxc8SxLEJ1bC5LYXQsQWlkYXQsU2l0ZSxIZWFkZXIKMjAwLE9LLEtpcmFsxLFrIETDvGtrYW4gJiBNYcSfYXphLEVtbGFrw6fEsWRhbixZb2ssQmFsZ2F0LCw0Mjg5OCwsLDM1MDAsVEwsMSwxNjAsVVNUQSBFTUxBSyBNw5zFnkFWxLBSTMSwxJ7EsC01NTU0LGh0dHA6Ly93d3cuaHVycml5ZXRlbWxhay5jb20vaXN5ZXJpLWtpcmFsaWsvYW5rYXJhLWNhbmtheWEtYmFsZ2F0LWVtbGFrY2lkYW4tZHVra2FuLW1hZ2F6YS9kZXRheS8yNTgxNDg2OCwyNTgxNDg2OCxNdXN0YWZhIFnDvEtTRUwsKDU1NSkgNDQxIDAwIDExLCgzMTIpIDI4NiA1NiA3NiwsLCwsWUlMRElSSU0gS1VMRSBLQVLFnklTSSBLxLBSQUxJSyBEw5xLS0FOCjIwMCxPSyxTYXTEsWzEsWsgT2ZpcyxFbWxha8OnxLFkYW4sWW9rLEJhbGdhdCwsNDI4OTgsLCw4MjUwMDAsVEwsMTAsMTgwLMOHw5ZMT8SeTFUgR0FZUsSwTUVOS1VMLTM0OTMsaHR0cDovL3d3dy5odXJyaXlldGVtbGFrLmNvbS9pc3llcmktc2F0aWxpay9hbmthcmEtY2Fua2F5YS1iYWxnYXQtZW1sYWtjaWRhbi1vZmlzL2RldGF5LzI2NDMzNjg4LDI2NDMzNjg4LEtPUkFZIMOHw5ZMT8SeTFUsKDUzMikgNzAzIDA1IDI1LCgzMTIpIDQ4MSA4OCA2Nyw1LCwsLMOHw5ZMT8SeTFVOREFOIEtPTllBIFlPTFUgR8OWS0tVxZ5BxJ5JTkRBIDcrU0VLUkVURVIgU8OcUEVSIEzDnFhYWCBPRsSwUwoyMDAsT0ssU2F0xLFsxLFrIETDvGtrYW4gJiBNYcSfYXphLEVtbGFrw6fEsWRhbixWYXIsQmFsZ2F0LCw0Mjg5OCxFdmV0LCwxNzUwMDAwLFRMLDMsMjQwLERPxJ5BTiBFTUxBSy9TxLBOQU4gQ0FEREVTxLAtMjEyMixodHRwOi8vd3d3Lmh1cnJpeWV0ZW1sYWsuY29tL2lzeWVyaS1zYXRpbGlrL2Fua2FyYS1jYW5rYXlhLWJhbGdhdC1lbWxha2NpZGFuLWR1a2thbi1tYWdhemEvZGV0YXkvMjY0MzI5NDMsMjY0MzI5NDMsRXJlbiBLQURJWU9SQU4sKDUzOSkgODE4IDc1IDYzLCgzMTIpIDQ4MCA4MCA0NywzLCwsLERPxJ5BTiAzJ0RFTiBDQURERSDDnFpFUsSwIEtVUlVNU0FMIEvEsFJBQ0lMSQoyMDAsT0ssU2F0xLFsxLFrIETDvGtrYW4gJiBNYcSfYXphLEVtbGFrw6fEsWRhbixWYXIsQmFsZ2F0LCw0Mjg5OCwsLDk5MDAwMCxUTCw5LDUwMCxET8SeQU4gRU1MQUsvU8SwTkFOIENBRERFU8SwLTIxMjIsaHR0cDovL3d3dy5odXJyaXlldGVtbGFrLmNvbS9pc3llcmktc2F0aWxpay9hbmthcmEtY2Fua2F5YS1iYWxnYXQtZW1sYWtjaWRhbi1kdWtrYW4tbWFnYXphL2RldGF5LzI2NDMzNDI1LDI2NDMzNDI1LEVyZW4gS0FESVlPUkFOLCg1MzkpIDgxOCA3NSA2MywoMzEyKSA0ODAgODAgNDcsNSwsLCxET8SeQU4gMydERU4gRU1TQUxTxLBaIDUwME0yIEzDnFggRMOcS0tBTi1PRsSwUwoyMDAsT0ssS2lyYWzEsWsgRMO8a2thbiAmIE1hxJ9hemEsRW1sYWvDp8SxZGFuLFZhcixCYWxnYXQsLDQyODk4LEV2ZXQsLDMyNTAsVEwsOCwxNjAsRE/EnkFOIEVNTEFLL1PEsE5BTiBDQURERVPEsC0yMTIyLGh0dHA6Ly93d3cuaHVycml5ZXRlbWxhay5jb20vaXN5ZXJpLWtpcmFsaWsvYW5rYXJhLWNhbmtheWEtYmFsZ2F0LWVtbGFrY2lkYW4tZHVra2FuLW1hZ2F6YS9kZXRheS8yNjQzNTA5NCwyNjQzNTA5NCxFcmVuIEtBRElZT1JBTiwoNTM5KSA4MTggNzUgNjMsKDMxMikgNDgwIDgwIDQ3LDMsLCwsRE/EnkFOIDMgREVOIDUrIFNFS1JFVEVSWUEgU8OcUEVSIEzDnFggWUFQSUxJIFdDIE1VVEZBSwoyMDAsT0ssS2lyYWzEsWsgT2ZpcyxFbWxha8OnxLFkYW4sWW9rLEJhbGdhdCwsNDI4OTgsLCw0NzUwLFRMLDYsMzAwLFBSRVNUxLBKIEdBWVLEsE1FTktVTC0xNDY1LGh0dHA6Ly93d3cuaHVycml5ZXRlbWxhay5jb20vaXN5ZXJpLWtpcmFsaWsvYW5rYXJhLWNhbmtheWEtYmFsZ2F0LWVtbGFrY2lkYW4tb2Zpcy9kZXRheS8yNjQzNjMxNCwyNjQzNjMxNCxFQlJVIEfDvE5FTCwoNTMyKSA3MDcgMzMgMTUsKDMxMikgNDcyIDg0IDE0LDMsLCwsUFJFU1TEsEonREVOIMSwxZ4gTUVSS0VaxLBOREUgMzAwIE0yIEFSQSBLQVQgQ0FEREUgw5xaRVLEsCBPRsSwUwoyMDAsT0ssS2lyYWzEsWsgRMO8a2thbiAmIE1hxJ9hemEsRW1sYWvDp8SxZGFuLFlvayxCYWxnYXQsLDQyODk4LCwsMzUwMCxUTCwyLDIyMCxLVUxFTMSwIEdBWVLEsE1FTktVTC0yNjg3NSxodHRwOi8vd3d3Lmh1cnJpeWV0ZW1sYWsuY29tL2lzeWVyaS1raXJhbGlrL2Fua2FyYS1jYW5rYXlhLWJhbGdhdC1lbWxha2NpZGFuLWR1a2thbi1tYWdhemEvZGV0YXkvMjY0MzU0ODMsMjY0MzU0ODMsU2VycGlsIMOWemRvxJ9hbiwoNTMyKSAzODQgMTEgMzAsKDMxMikgNDQ2IDA0IDA2LCwsLCxCQUxHQVQnVEEgREVWUkVOIFlPTEEgQ0VQSEVMxLAgTUFSS0VUCjIwMCxPSyxTYXTEsWzEsWsgUGxhemEgS2F0xLEsRW1sYWvDp8SxZGFuLFlvayxCYWxnYXQsLDQyODk4LCwsOTc1MDAwLFRMLDUsMjUwLMWeRUjEsFIgRU1MQUstNTE0NixodHRwOi8vd3d3Lmh1cnJpeWV0ZW1sYWsuY29tL2lzeWVyaS1zYXRpbGlrL2Fua2FyYS1jYW5rYXlhLWJhbGdhdC1lbWxha2NpZGFuLXBsYXphLWthdGkvZGV0YXkvMjI2MzU5OTksMjI2MzU5OTksRMSwTEVLIFPDvE1FTiwsKDMxMikgNDI3IDE0IDI4LDMsLCwsxZ5FSMSwUiBCQUxHQVRUQSBTSUZJUiAzIEFSQcOHIE9UT1BBUktMSSBEVUJMRUtTIFNBVElZT1IKMjAwLE9LLEtpcmFsxLFrIEFwYXJ0bWFuIERhaXJlc2ksRW1sYWvDp8SxZGFuLFlvayxCYWxnYXQsLDQyODk4LCwsMjUwMCxUTCwzLDM1MCxHw5xSU0VMIEVNTEFLLTE5MDM3LGh0dHA6Ly93d3cuaHVycml5ZXRlbWxhay5jb20vaXN5ZXJpLWtpcmFsaWsvYW5rYXJhLWNhbmtheWEtYmFsZ2F0LWVtbGFrY2lkYW4tYXBhcnRtYW4tZGFpcmVzaS9kZXRheS8yMzgyODE5MywyMzgyODE5MyxHw7xyc2VsIMOHQcSeSVIsKDUzMikgNDgyIDAyIDEyLCgzMTIpIDQ3OSAwNSA3MCw0LCwsLEJBTEdBVCBHw5ZLS1XFnkHEnkkgQ0FEREVTxLBOREUgMzUwIE0yIEhFUsSwxZ5FIFVZR1VO"
#data = 'Zm9vLGJhcixiYXoKYWFhLGJiYixjY2MKZGRkLGVlZSxmZmYKMDAwLDExMSwwMDA='
#data = 'U3RhdHVzIENvZGUJU3RhdHVzCUR1cnVtCUtpbWRlbglZZXRraQlCw7ZsZ2UJQsO2bGdlIERldGF5CcSwbGFuIFRhcmloCVlhcMSxbMSxCUXFn3lhbMSxCSBGaXlhdCAJUGFyYQlCw7Zsw7xtCW0yCcWeaXJrZXQJTGluawlObwlEYW7EscWfbWFuL1NhaGlwCUNlcCBUZWwJRGnEn2VyIFRlbAlLYXQgU2F5xLFzxLEJQnVsLiBLYXQJQWlkYXQJU2l0ZQlIZWFkZXINCjIwMwlPSwlTYXTEsWzEsWsgUmVzaWRlbmNlCVNhaGliaW5kZW4JCUFua2FyYSAvIMOHYW5rYXlhIC8gw4dheXlvbHUJCTEwLjYuMjAxNwkJCSAyNDUuMDAwIAlUTAkxICsgMAkzMAkJaHR0cDovL3d3dy5odXJyaXlldGVtbGFrLmNvbS9rb251dC1zYXRpbGlrL2Fua2FyYS1jYW5rYXlhLWNheXlvbHUtc2FoaWJpbmRlbi1yZXNpZGVuY2UvZGV0YXkvMjY0MTg1ODcJMjY0MTg1ODcJaMO8c2V5aW4gaGF0aXBvxJ9sdQkoNTU1KSA1NjYgNTYgODkJCQkxMgkJV2VzdCBHYXRlIFJlc2lkZW5jZQlTQUhJQklOREVOIFdFU1QgR0FURSdURSAxKzAgSEnDhyBPVFVSVUxNQU3EscWeIFJFWklEQU5TDQoyMDMJT0sJU2F0xLFsxLFrIEFwYXJ0bWFuIERhaXJlc2kJRW1sYWvDp8SxZGFuCVZhcglBbmthcmEgLyDDh2Fua2F5YSAvIFlhxZ9hbWtlbnQJCTkuNi4yMDE3CQkJIDMzNS4wMDAgCVRMCTEgKyAxCTcwCURFTsSwWiBFTUxBSyBZYcWfYW1rZW50LTY4OTAJaHR0cDovL3d3dy5odXJyaXlldGVtbGFrLmNvbS9rb251dC1zYXRpbGlrL2Fua2FyYS1jYW5rYXlhLXlhc2Fta2VudC1lbWxha2NpZGFuLWFwYXJ0bWFuLWRhaXJlc2kvZGV0YXkvMjY0MDc4NzYJMjY0MDc4NzYJQXlzZWwgQ0FORVIJKDUzMikgMjQyIDM2IDkwCSgzMTIpIDIxNyAwMCA3NwkzMgkxNQkyNjQgVEwJV2VzdCBHYXRlIFJlc2lkZW5jZQlXRVNUIEdBVEUgQU5LQVJBTklOIEVOIEfDllpERSBSRVPEsERFTkNFIFZFIEFWTSBQUk9KRUxFUsSwTkRFTiBCxLBSxLANCjIwMwlPSwlTYXTEsWzEsWsgQXBhcnRtYW4gRGFpcmVzaQlFbWxha8OnxLFkYW4JVmFyCUFua2FyYSAvIMOHYW5rYXlhIC8gWWHFn2Fta2VudAkJOS42LjIwMTcJCQkgMzk1LjAwMCAJVEwJMSArIDEJNzEJREVOxLBaIEVNTEFLIFlhxZ9hbWtlbnQtNjg5MAlodHRwOi8vd3d3Lmh1cnJpeWV0ZW1sYWsuY29tL2tvbnV0LXNhdGlsaWsvYW5rYXJhLWNhbmtheWEteWFzYW1rZW50LWVtbGFrY2lkYW4tYXBhcnRtYW4tZGFpcmVzaS9kZXRheS8yNjQwODAyOQkyNjQwODAyOQlBeXNlbCBDQU5FUgkoNTMyKSAyNDIgMzYgOTAJKDMxMikgMjE3IDAwIDc3CTMyCTIwCTI2NCBUTAlXZXN0IEdhdGUgUmVzaWRlbmNlCURFTsSwWidERU4gV0VTVEdBVEUnREUgMSsxIEdFTsSwxZ4gTVVURkFLTEkgTMOcWCBEQcSwUkUNCjIwMwlPSwlTYXTEsWzEsWsgQXBhcnRtYW4gRGFpcmVzaQlFbWxha8OnxLFkYW4JVmFyCUFua2FyYSAvIMOHYW5rYXlhIC8gWWHFn2Fta2VudAkJOS42LjIwMTcJCQkgNjM1LjAwMCAJVEwJMiArIDEJMTM3CURFTsSwWiBFTUxBSyBZYcWfYW1rZW50LTY4OTAJaHR0cDovL3d3dy5odXJyaXlldGVtbGFrLmNvbS9rb251dC1zYXRpbGlrL2Fua2FyYS1jYW5rYXlhLXlhc2Fta2VudC1lbWxha2NpZGFuLWFwYXJ0bWFuLWRhaXJlc2kvZGV0YXkvMjY0MDgxMDEJMjY0MDgxMDEJQXlzZWwgQ0FORVIJKDUzMikgMjQyIDM2IDkwCSgzMTIpIDIxNyAwMCA3NwkzMgk1CQlXZXN0IEdhdGUgUmVzaWRlbmNlCURFTsSwWidERU4gV0VTVEdBVEUnREUgMisxIEfDnE5FWSBCQVRJIENFUEhFIFRFUkFTTEkgTMOcWCBEQcSwUkUNCjIwMwlPSwlTYXTEsWzEsWsgQXBhcnRtYW4gRGFpcmVzaQlFbWxha8OnxLFkYW4JVmFyCUFua2FyYSAvIMOHYW5rYXlhIC8gWWHFn2Fta2VudAkJOS42LjIwMTcJCQkgMzc1LjAwMCAJVEwJMSArIDEJNTQJREVOxLBaIEVNTEFLIFlhxZ9hbWtlbnQtNjg5MAlodHRwOi8vd3d3Lmh1cnJpeWV0ZW1sYWsuY29tL2tvbnV0LXNhdGlsaWsvYW5rYXJhLWNhbmtheWEteWFzYW1rZW50LWVtbGFrY2lkYW4tYXBhcnRtYW4tZGFpcmVzaS9kZXRheS8yNjQwODE2MQkyNjQwODE2MQlBeXNlbCBDQU5FUgkoNTMyKSAyNDIgMzYgOTAJKDMxMikgMjE3IDAwIDc3CTMyCTUJMjgyIFRMCVdlc3QgR2F0ZSBSZXNpZGVuY2UJREVOxLBaJ0RFTiBXRVNUIEdBVEUnREUgMSsxIEdFTsSwxZ4gVEVaR0FITEkgRVNLxLDFnkVIxLBSIFlPTFUgQ0VQSEVMxLANCg=='
data = 'WWV0a2ksQsO2bGdlLFlhcMSxbMSxLEXFn3lhbMSxLEZpeWF0LELDtmzDvG0sbTIsS2F0U2F5xLFzxLEKMCxCYWxnYXQsMCwwLDE1MDAwLDE4LDgwMC4wLDMuMAowLEJhbGdhdCwxLDAsMTUwMDAsMTAsNDQwLjAsMTUuMAowLEJhbGdhdCwwLDAsMTMwMCwyLDY1LjAsMjUuMAowLEJhbGdhdCwwLDAsMTUwMCwyLDcwLjAsMjYuMAowLEJhbGdhdCwxLDEsODAwMCw1LDQ3MC4wLDcuMAowLEJhbGdhdCwwLDAsNDAwMCwyLDc1LjAsMzMuMAoxLEJhbGdhdCwwLDAsNDg1MCw0LDE1MC4wLDMwLjAKMCxCYWxnYXQsMCwwLDEzMDAsMiw2NS4wLDI1LjAKMSxCYWxnYXQsMCwwLDE3NTAsMSw1NS4wLDMuMAowLEJhbGdhdCwwLDAsMTEwMDAsMiwxODAuMCwyOS4wCjAsQmFsZ2F0LDAsMCw1NTAwLDQsMTUwLjAsMjMuMAowLEJhbGdhdCwwLDAsNDUwMCwyLDExOC4wLDMzLjAKMCxCYWxnYXQsMCwwLDY1MDAsMywxNTAuMCwyMy4wCjAsQmFsZ2F0LDAsMCw1MDAwLDEsMTUwLjAsMjMuMAowLEJhbGdhdCwwLDAsNTAwMCwxLDE0NC4wLDIzLjAKMCxCYWxnYXQsMCwwLDUwMDAsMSwxNDQuMCwyMy4wCjAsQmFsZ2F0LDAsMCwxMDAwMCwyLDI4OC4wLDIzLjAKMSzDh3VrdXJhbWJhciwwLDAsNjI1MCw1LDE0OS4wLDIwLjAKMSzDh3VrdXJhbWJhciwwLDAsNjUwMCwxLDE4MC4wLDIwLjAKMSzDh3VrdXJhbWJhciwxLDAsNTUwMCw0LDIwMC4wLDE4LjAKMCzDh3VrdXJhbWJhciwwLDAsNjUwMCw0LDEuMCwxOC4wCjEsw4d1a3VyYW1iYXIsMSwxLDE0MDAsMiw2MC4wLDE3LjAKMCzDh3VrdXJhbWJhciwwLDAsMjIwMDAsNywyOTguMCwyOS4wCjEsw4d1a3VyYW1iYXIsMCwwLDU1MDAsMywxMjUuMCwyMS4wCjEsw4d1a3VyYW1iYXIsMCwwLDYyNTAsNSwxNjAuMCwyMi4wCjAsw4d1a3VyYW1iYXIsMCwwLDI1MDAsMiw1MC4wLDIwLjAKMCzDh3VrdXJhbWJhciwwLDAsODAwMDAsMTAsODgwLjAsMjguMAowLMOHdWt1cmFtYmFyLDAsMCwzMDAwMCwxMCw0MjAuMCwyOS4wCjAsw4d1a3VyYW1iYXIsMCwwLDUwMDAwLDEwLDUwMi4wLDI5LjAKMCzDh3VrdXJhbWJhciwwLDAsODAwMDAsMjAsMTAwMC4wLDI5LjAKMCzDh3VrdXJhbWJhciwwLDAsMzc1MCwzLDkwLjAsMTIuMAoxLMOHdWt1cmFtYmFyLDEsMCwxMjUwMCwyLDMwMC4wLDI1LjAKMCzDh3VrdXJhbWJhciwwLDAsNzUwMCw0LDE4MC4wLDI1LjAKMCzDh3VrdXJhbWJhciwwLDAsMTYwMDAsMiw0MDguMCwyNS4wCjEsw4d1a3VyYW1iYXIsMSwwLDgwMDAsMSwyMDQuMCwyNS4wCjAsw4d1a3VyYW1iYXIsMCwwLDgwMDAsMSwyMDQuMCwyNS4wCjAsw4d1a3VyYW1iYXIsMCwwLDcwMDAsMiwxNDkuMCwyMC4wCjAsw4d1a3VyYW1iYXIsMCwwLDcwMDAsMSwxODAuMCwyMC4wCjEsw4d1a3VyYW1iYXIsMCwwLDU1MDAsMyw4NS4wLDI4LjAKMCzDh3VrdXJhbWJhciwwLDAsMTQ0MDUsMSwzMzUuMCwyOC4wCjAsw4d1a3VyYW1iYXIsMCwwLDI3OTUsMSw2NS4wLDI4LjAKMCzDh3VrdXJhbWJhciwwLDAsMjg4MTAsMSw2NzAuMCwyOC4wCjAsw4d1a3VyYW1iYXIsMSwwLDg3NTAsMiwyMTUuMCwyNS4wCjAsw4d1a3VyYW1iYXIsMSwwLDQwMDAsMSw5MC4wLDI1LjAKMCzDh3VrdXJhbWJhciwwLDAsNDUwMCwxLDk5LjAsMjEuMAoxLMOHdWt1cmFtYmFyLDAsMCwxMDAwMCwxLDE4MC4wLDI4LjAKMSzDh3VrdXJhbWJhciwwLDAsNzUwMCwyLDE4MC4wLDI4LjAKMSzDh3VrdXJhbWJhciwwLDAsNTUwMCwzLDkwLjAsMjguMAoxLMOHdWt1cmFtYmFyLDAsMCw1NTAwLDMsOTAuMCwyOC4wCjEsw4d1a3VyYW1iYXIsMCwwLDUwMDAsMSw5MC4wLDI4LjAKMSzDh3VrdXJhbWJhciwwLDAsNTAwMCwxLDkwLjAsMjguMAoxLMOHdWt1cmFtYmFyLDAsMCw2MDAwLDMsMTE1LjAsMjMuMAoxLMOHdWt1cmFtYmFyLDAsMCw0MDAwLDMsODcuMCwyMy4wCjAsw4d1a3VyYW1iYXIsMCwwLDc1MDAsMSwxNzUuMCwxNy4wCjEsw4d1a3VyYW1iYXIsMCwwLDQ1MDAsMywxMTUuMCwyMi4wCjAsw4d1a3VyYW1iYXIsMCwwLDI5MDAsMyw3OS4wLDIwLjAKMSzDh3VrdXJhbWJhciwwLDAsMzgwMCwzLDExMC4wLDE4LjAKMCzDh3VrdXJhbWJhciwwLDAsNjUwMCw1LDE1MC4wLDE1LjAKMCzDh3VrdXJhbWJhciwwLDAsNTAwMCw0LDEyNS4wLDEyLjAKMSzDh3VrdXJhbWJhciwxLDAsMTEwMDAsMSwyMDAuMCwxOS4wCjEsw4d1a3VyYW1iYXIsMCwwLDE1MDAsMiw2NS4wLDI1LjAKMCzDh3VrdXJhbWJhciwwLDAsNTAwMCwyLDEyMC4wLDE1LjAKMCzDh3VrdXJhbWJhciwxLDAsNDUwMCw0LDEwNS4wLDE1LjAKMSzDh3VrdXJhbWJhciwwLDAsMjMwMDAsMTAsNDE2LjAsMzMuMAowLMOHdWt1cmFtYmFyLDEsMCw0MDAwLDEsOTAuMCwxOS4wCjEsw4d1a3VyYW1iYXIsMCwwLDI1MDAwLDUsNDA1LjAsMjguMAoxLMOHdWt1cmFtYmFyLDAsMCwzMDAwMCw1LDU3NS4wLDI4LjAKMSzDh3VrdXJhbWJhciwwLDAsNjgwMCwxLDE3NC4wLDE5LjAKMSzDh3VrdXJhbWJhciwwLDAsMjEwMDAsMSw1MjIuMCwxOS4wCjAsw4d1a3VyYW1iYXIsMCwwLDE0MDAwLDEsMzUwLjAsMTkuMAoxLMOHdWt1cmFtYmFyLDAsMCw2ODAwLDEsMTc0LjAsMTkuMAoxLMOHdWt1cmFtYmFyLDEsMCwxMjAwMCwzLDQ1MC4wLDI1LjAKMSzDh3VrdXJhbWJhciwwLDAsNDAwMCwxLDkwLjAsMjUuMAowLMOHdWt1cmFtYmFyLDAsMCw3MDAwLDEsMjA1LjAsMjAuMAoxLMOHdWt1cmFtYmFyLDEsMCw0MDAwLDEsOTAuMCwyMS4wCjEsw4d1a3VyYW1iYXIsMCwwLDkwMDAsMSwyMDQuMCwxOS4wCjEsw4d1a3VyYW1iYXIsMCwwLDI1MDAsMiw3NS4wLDE1LjAKMCzDh3VrdXJhbWJhciwwLDAsMTMwMDAsMiwzMzYuMCwyMS4wCjAsw4d1a3VyYW1iYXIsMCwwLDg3NTAsNSwyMDAuMCwyMS4wCjAsw4d1a3VyYW1iYXIsMCwwLDg3NTAsNSwyMDAuMCwyMS4wCjEsw4d1a3VyYW1iYXIsMCwwLDMyNTAsMSwxMTYuMCwyMS4wCjAsw4d1a3VyYW1iYXIsMSwwLDE2MDAwLDYsMTg1LjAsMzIuMAoxLMOHdWt1cmFtYmFyLDAsMCwxMDAwMCw0LDE3Ni4wLDI5LjAKMSzDh3VrdXJhbWJhciwwLDAsOTUwMCw0LDE4MC4wLDI4LjAKMSzDh3VrdXJhbWJhciwwLDAsMTAwMDAsMiwxNjAuMCwyOC4wCjEsw4d1a3VyYW1iYXIsMCwwLDgwMDAsMiwxNjAuMCwyOC4wCjEsw4d1a3VyYW1iYXIsMCwwLDkwMDAsMiwxODAuMCwyOC4wCjEsw4d1a3VyYW1iYXIsMCwwLDEwMDAwLDIsMTgwLjAsMjguMAoxLMOHdWt1cmFtYmFyLDAsMCw2MDAwMCw4LDg4MC4wLDI4LjAKMSzDh3VrdXJhbWJhciwwLDAsNzAwMCw2LDQ0MC4wLDI5LjAKMCzDh3VrdXJhbWJhciwwLDAsNzM1MCwxLDE3NC4wLDE0LjAKMCzDh3VrdXJhbWJhciwwLDAsMjcwMDAsMSw0NDAuMCwyOC4wCjEsw4d1a3VyYW1iYXIsMCwwLDQwMDAsMSwxMDAuMCwyNy4wCjAsw4d1a3VyYW1iYXIsMSwwLDIwMDAwLDIsNDE2LjAsMzMuMAoxLMOHdWt1cmFtYmFyLDEsMCwzMjUwLDQsNjQuMCwzMy4wCjEsw4d1a3VyYW1iYXIsMCwwLDEwMDAwLDEsMTgwLjAsMTkuMAoxLMOHdWt1cmFtYmFyLDAsMCw2MDAwLDIsMzAwLjAsMjcuMAoxLMOHdWt1cmFtYmFyLDAsMCwxOTAwMCwyLDQwMC4wLDE5LjAKMSzDh3VrdXJhbWJhciwwLDAsOTAwMCwyLDIwMC4wLDI3LjAKMSzDh3VrdXJhbWJhciwwLDAsMTAwMDAsMiwyNTAuMCwyNy4wCjAsw4d1a3VyYW1iYXIsMCwwLDYwMDAsMSwxMjAuMCwxNS4wCjAsw4d1a3VyYW1iYXIsMCwwLDIwMDAwLDQsMjgwLjAsMjIuMAowLMOHdWt1cmFtYmFyLDAsMCw1MDAwLDEsMTcwLjAsMTUuMAowLMOHdWt1cmFtYmFyLDAsMCw2MDAwMCwyMiwxMTUwLjAsMzAuMAowLMOHdWt1cmFtYmFyLDAsMCwzMjUwMCw0LDEzMDYuMCwzMC4wCjAsw4d1a3VyYW1iYXIsMCwwLDQwMDAsMSwxMDAuMCwxNS4wCjEsS8SxesSxbGF5LDAsMCwxNTAwMCwyMSwxMDAwLjAsNi4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMjM1MCwxLDc3LjAsMjIuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDM1MDAsMiw2NS4wLDMwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwzMjUwLDQsMTE1LjAsNC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMzI1MCwzLDExMC4wLDQuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDI2NTAsNCwxMTUuMCw0LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwzNTAwLDQsMTMwLjAsNC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMzYwMCwxLDE2MS4wLDkuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDUyNTAsMSwxNDAuMCw1LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwyODUwLDMsMTEwLjAsNS4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMzAwMCwxLDc3LjAsNi4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNjAwMCwzLDEzMy4wLDIyLjAKMCxNdXN0YWZhIEtlbWFsLDAsMCw1MjUwLDEsMTY4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDMwMDAsMSw3Ny4wLDYuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQyMDAwLDEsMTAyNC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1NzUwLDEsMTQwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDI0NTAwLDEsNTEyLjAsMjAuMAowLE11c3RhZmEgS2VtYWwsMSwwLDE4MDAsMiw2MS4wLDUuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDM1MDAsNCwxNDAuMCw0LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwyNzUwLDQsMTA2LjAsNS4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMTg4MDAsMSwzOTIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMTYzMDAsMSwzNDAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMTA1MDAsMSwyMjAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMzcwMCw0LDE5MC4wLDQuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDQwMDAsMSw5MC4wLDIyLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwxMjUwMCwxLDMwNS4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDEsMCw5OTAwLDEsMjA4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQyMDAsMSw4OC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwzNjAwLDEsMTYxLjAsOS4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMjYwMCwxLDc4LjAsMjIuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDQ1NTAsMiwxMTguMCwyMi4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMjgwMCwxLDc4LjAsMjIuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDcwMDAsMSwxNzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTQwMCwxLDEzMi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0OTAwLDEsMTIwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDI4NTAsMywxMTAuMCw0LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MDAwLDQsMTUwLjAsNC4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsMjc1MCwzLDEwMC4wLDQuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDQwMDAsMiw4NS4wLDE4LjAKMCxNdXN0YWZhIEtlbWFsLDAsMCw1MDAwLDEsMTQwLjAsNC4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMzYwMCwxLDE2MS4wLDkuMAowLE11c3RhZmEgS2VtYWwsMCwwLDI3NTAsMSw4NS4wLDQuMAowLE11c3RhZmEgS2VtYWwsMCwwLDI4MDAsMSw4NS4wLDQuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDMxMDAsMSw4MC4wLDIyLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw3MDAwLDEsMTM1LjAsMTguMAowLE11c3RhZmEgS2VtYWwsMCwwLDgwMDAsMiwzMTAuMCwzLjAKMSxNdXN0YWZhIEtlbWFsLDEsMCwxMTAwMCwxLDI4NS4wLDE4LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwzNjAwLDEsMTYxLjAsOS4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsNDY1MCwyLDEwMC4wLDIyLjAKMSxNdXN0YWZhIEtlbWFsLDEsMCw1MDAwLDEsMTA4LjAsMjIuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDU2MDAsMSwxMTIuMCwyMi4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMzUwMCwxLDc4LjAsMjIuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQwMDAsNiwyNzAuMCw1LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwzNjAwLDEsMTYxLjAsOS4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMjY1MCwzLDgwLjAsNC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTAwMCwxLDE1NC4wLDQuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQyNTAsNiwxNjAuMCw3LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwyMjUwLDMsODAuMCw3LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwyMjUwLDMsODAuMCw3LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwyNTAwLDEsODUuMCw0LjAKMCxNdXN0YWZhIEtlbWFsLDAsMCw3MDAwLDMsMTQ0LjAsMTguMAoxLE11c3RhZmEgS2VtYWwsMSwwLDM1MDAsMSw3MC4wLDIyLjAKMSxNdXN0YWZhIEtlbWFsLDEsMCw0MzUwLDEsODguMCwyMi4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNjI1MCwzLDE0NC4wLDE4LjAKMSxNdXN0YWZhIEtlbWFsLDEsMCwzMDAwLDEsNjAuMCwyMi4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMzc1MCwxLDc1LjAsMjIuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDM3NTAsMSw3NS4wLDIyLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MDAwLDEsODguMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMzYwMCwxLDE2MS4wLDkuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDEwNTAwLDQsMTk3LjAsMjIuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQ3NTAsNCwxMTIuMCw1LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw4NzUwLDcsMjEyLjAsNS4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDAwMCwzLDEwMC4wLDUuMAowLE11c3RhZmEgS2VtYWwsMCwwLDYwMDAsMSwyMDAuMCw5LjAKMSxNdXN0YWZhIEtlbWFsLDEsMCw0MjAwLDQsMTE3LjAsOS4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMzQ1MCwxLDkxLjAsMjIuMAowLE11c3RhZmEgS2VtYWwsMCwwLDQxMDAsNCwxMTguMCw5LjAKMCxNdXN0YWZhIEtlbWFsLDAsMCw2MjUwLDMsMTQ0LjAsMTguMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQxMDAsMyw3Mi4wLDEwLjAKMCxNdXN0YWZhIEtlbWFsLDAsMCw3MDAwLDIsMTQ0LjAsMTguMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU0MDAsMSwxMjAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTk1MCwxLDEzMi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1OTUwLDEsMTMyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDc3NDAsMSwxNzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNzc0MCwxLDE3Mi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw3NzQwLDEsMTcyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDc3NDAsMSwxNzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDAwMCwxLDg4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQwMDAsMSw4OC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MDAwLDEsODguMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDAwMCwxLDg4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQyMjUsMSw4OC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1NDAwLDEsMTIwLjAsMjAuMAowLE11c3RhZmEgS2VtYWwsMCwwLDU0MDAsMSwxMjAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTQwMCwxLDEyMC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1NDAwLDEsMTIwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU0MDAsMSwxMjAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTQwMCwxLDEyMC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1NDAwLDEsMTIwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU5NTAsMSwxMzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTk1MCwxLDEzMi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1OTUwLDEsMTMyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU5NTAsMSwxMzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTk1MCwxLDEzMi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1OTUwLDEsMTMyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU5NTAsMSwxMzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTk1MCwxLDEzMi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw2MzAwLDEsMTQwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDc3NDAsMSwxNzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNzc0MCwxLDE3Mi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw3NzQwLDEsMTcyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDc3NDAsMSwxNzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNzc0MCwxLDE3Mi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw3NzQwLDEsMTcyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDkzNjAsMSwyMDguMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsOTM2MCwxLDIwOC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw5MzYwLDEsMjA4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDEzNzI1LDEsMzA1LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDIzMDQwLDEsNTEyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDIzMDQwLDEsNTEyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQwMDAsMSw4OC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MDAwLDEsODguMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDAwMCwxLDg4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQwMDAsMSw4OC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MDAwLDEsODguMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTQwMCwxLDEyMC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1OTUwLDEsMTMyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDc3NDAsMSwxNzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDAwMCwxLDg4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU0MDAsMSwxMjAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTQwMCwxLDEyMC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1NDAwLDEsMTIwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU0MDAsMSwxMjAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTk1MCwxLDEzMi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1OTUwLDEsMTMyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDYzMDAsMSwxNDAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNzc0MCwxLDE3Mi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw3NzQwLDEsMTcyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDc3NDAsMSwxNzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDAwMCwxLDg4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQwMDAsMSw4OC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MDAwLDEsODguMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTQwMCwxLDEyMC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1NDAwLDEsMTIwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU0MDAsMSwxMjAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTQwMCwxLDEyMC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1OTUwLDEsMTMyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU5NTAsMSwxMzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTk1MCwxLDEzMi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw2MzAwLDEsMTQwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDc3NDAsMSwxNzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNzc0MCwxLDE3Mi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw3NzQwLDEsMTcyLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDc3NDAsMSwxNzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNzc0MCwxLDE3Mi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MDAwLDEsODguMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDAwMCwxLDg4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQwMDAsMSw4OC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MDAwLDEsODguMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDAwMCwxLDg4LjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQwMDAsMSw4OC4wLDIwLjAKMCxNdXN0YWZhIEtlbWFsLDEsMCw3NTAwLDIsMjAwLjAsMTIuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDIzMDAsMSw3Ny4wLDIyLjAKMSxNdXN0YWZhIEtlbWFsLDEsMCw0NjAwLDIsMTE4LjAsMjIuMAowLE11c3RhZmEgS2VtYWwsMCwwLDQwMDAsMywxNDAuMCw1LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwxMDAwMCw3LDIzNC4wLDE4LjAKMCxNdXN0YWZhIEtlbWFsLDAsMCwyNTAwMCwxLDQzMC4wLDQuMAowLE11c3RhZmEgS2VtYWwsMSwwLDQ1MDAsNCwxNDUuMCwzLjAKMCxNdXN0YWZhIEtlbWFsLDAsMCwxNTAwMCwxLDQ1Mi4wLDQuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDM1MDAsNiwxNDAuMCw1LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwzNDAwLDYsMTQwLjAsNS4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMjAwMCwzLDc1LjAsNS4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMzUwMCw2LDE0MC4wLDUuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDI0MDAsMyw3NS4wLDUuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDE4MDAsMyw3NS4wLDUuMAowLE11c3RhZmEgS2VtYWwsMCwwLDE4MDAsMyw4MC4wLDUuMAowLE11c3RhZmEgS2VtYWwsMCwwLDYyNTAsMywxNDQuMCwxOC4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNjI1MCwzLDE0NC4wLDE4LjAKMCxNdXN0YWZhIEtlbWFsLDAsMCw3MDAwLDIsMTQ0LjAsMTguMAowLE11c3RhZmEgS2VtYWwsMCwwLDcwMDAsMiwxNDQuMCwxOC4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNjc1MCwzLDE0NC4wLDE4LjAKMCxNdXN0YWZhIEtlbWFsLDAsMCwzMjUwLDEsODAuMCwxNC4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNDEwMCwyLDcyLjAsMTAuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDI2MDAsMSw3Ny4wLDIyLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1NTAwLDMsMTUwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDg1MDAsNCwyNTAuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNzAwMCw0LDE4NS4wLDUuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDMwMCwxLDY1LjAsMTkuMAoxLE11c3RhZmEgS2VtYWwsMSwxLDI3MDAsMSw2Ny4wLDYuMAowLE11c3RhZmEgS2VtYWwsMCwwLDExMDAwLDQsMTk3LjAsMTkuMAowLE11c3RhZmEgS2VtYWwsMCwwLDcwMDAsMywxNDQuMCwxOC4wCjEsTXVzdGFmYSBLZW1hbCwxLDAsMzI1MCwyLDg1LjAsMTAuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDIwMDAsMSw0Ni4wLDYuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDI1NTAsMSw3Ny4wLDIyLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw3MjUwLDQsMTYwLjAsOS4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsMjEwMCwxLDQxLjAsOS4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNTUwMCw0LDEyNS4wLDkuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDI3MDAsMSw2Ny4wLDYuMAoxLE11c3RhZmEgS2VtYWwsMSwwLDMwMDAsMSw2Ny4wLDYuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDUwMDAsMSwxMTAuMCw5LjAKMSxNdXN0YWZhIEtlbWFsLDEsMCwyNzUwLDEsNjcuMCw2LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwxNzY0MCwxLDM5Mi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCwyMzA0MCwxLDUxMi4wLDIwLjAKMCxNdXN0YWZhIEtlbWFsLDAsMCw3MDAwLDMsMTQ0LjAsMTguMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU5NTAsMSwxMzIuMCwyMC4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNzc0MCwxLDE3Mi4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1NDAwLDEsMTIwLjAsMjAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDQwMDAsMSw4OC4wLDIwLjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MDAwLDEsODguMCwyMC4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsMjI1MDAsNSwzOTQuMCwxOS4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDAwMCwyLDcyLjAsMTAuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDI3MDAsMyw2Ny4wLDkuMAowLE11c3RhZmEgS2VtYWwsMCwwLDY3NTAsMywxNDQuMCwxOC4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNzAwMCwzLDE0NC4wLDE4LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw0MTAwLDMsMTEwLjAsOS4wCjEsTXVzdGFmYSBLZW1hbCwwLDAsNDc1MCwxLDEwNS4wLDE2LjAKMSxNdXN0YWZhIEtlbWFsLDAsMCw1NDAwLDEsMTIwLjAsMTYuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDEwMDAwLDIsMjIwLjAsMTYuMAoxLE11c3RhZmEgS2VtYWwsMCwwLDU0MDAsMSwxMjAuMCwyMC4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNDIwMDAsNCw5MzYuMCwxOS4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsMTIyMDAsMywyMjAuMCwxOC4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNDMwMDAsNiw4MDAuMCwyMC4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNzI1MCwzLDE0NC4wLDE4LjAKMCxNdXN0YWZhIEtlbWFsLDAsMCwzNTAwLDEsMTAyLjAsMTYuMAowLE11c3RhZmEgS2VtYWwsMCwwLDQ1MDAsMSwxMjIuMCwxNi4wCjAsTXVzdGFmYSBLZW1hbCwwLDAsNTAwMCwxLDEzNy4wLDE2LjAKMCxNdXN0YWZhIEtlbWFsLDAsMCw5NTAwLDEsMjU5LjAsMTYuMAowLE11c3RhZmEgS2VtYWwsMCwwLDE1MDAwLDEsMzk2LjAsMTYuMAowLE11c3RhZmEgS2VtYWwsMCwwLDI3MDAwLDEsMS4wLDE2LjAKMCxTw7bEn8O8dMO2esO8LDAsMCwxMjUwMCw5LDM4MC4wLDIyLjAKMCxTw7bEn8O8dMO2esO8LDEsMCw1NTAwLDEsMTg3LjAsMjQuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDM3NTAsNCw4OS4wLDI0LjAKMSxTw7bEn8O8dMO2esO8LDAsMCw5MDAwLDEsMjE1LjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDIwMDAwLDIsMTMwMC4wLDIyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw5MDAwLDEsMjEwLjAsMjQuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDI2MDAwLDI3LDg0MC4wLDIyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwzMjAwMCw0LDg3MS4wLDM0LjAKMSxTw7bEn8O8dMO2esO8LDAsMCw4NTAwLDEsMjE1LjAsMzQuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDE4NTAwLDIsNDM1LjAsMzQuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDI0MDAwLDMsNjU2LjAsMzQuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDEyMDAwLDEsMjY2LjAsMzQuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDgwMDAsMSwyMjAuMCwzNC4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsMzIwMDAsMSw4MDAuMCwyNC4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNDc1MCwyLDExOS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMDUwMCwxLDIxNS4wLDMwLjAKMCxTw7bEn8O8dMO2esO8LDEsMCw1NTAwLDEsMTg3LjAsMjQuMAowLFPDtsSfw7x0w7Z6w7wsMSwwLDEwMDAwLDIsMTcwLjAsMzUuMAowLFPDtsSfw7x0w7Z6w7wsMSwxLDQwMDAsMyw2MC4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMDc1MCwxLDE2OS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwyMDEwMCwyLDMzMC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwyMjk1MCwyLDMzOC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwyNjAwMCwyOCw5MDAuMCwyMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzk1MCwxLDE2NS4wLDMyLjAKMCxTw7bEn8O8dMO2esO8LDAsMCw0NDQ1MCw0LDY3NS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDk5NTAsMSwzMi4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3OTUwLDEsMTY1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExODAwLDIsMTk2LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDE1OTAwLDIsMzIuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsODAwMCwxLDIyMC4wLDM0LjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMjAwMCwxLDI2Ni4wLDM0LjAKMSxTw7bEn8O8dMO2esO8LDAsMCwzMTAwMCwzLDY1Ni4wLDM0LjAKMSxTw7bEn8O8dMO2esO8LDAsMCw0MjAwMCw0LDg3MS4wLDM0LjAKMCxTw7bEn8O8dMO2esO8LDEsMCw4NTAwLDMsMjE1LjAsMzQuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDE4NTAwLDIsNDM1LjAsMzQuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDkyMDAsMSwxNjAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE0MDAsMSwxOTAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE4MDAsMSwxOTYuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNDMwMDAsMTAsMTEwMC4wLDcuMAowLFPDtsSfw7x0w7Z6w7wsMSwwLDMwMDAsMyw3NS4wLDI3LjAKMCxTw7bEn8O8dMO2esO8LDEsMCwzMzAwLDMsNzUuMCwyNy4wCjAsU8O2xJ/DvHTDtnrDvCwxLDAsNTgwMCwzLDE0My4wLDI1LjAKMCxTw7bEn8O8dMO2esO8LDEsMCw1MDAwLDQsMTEyLjAsMzQuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDMwMDAsNCwxMTIuMCwyNy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNTE1MCw0LDExMi4wLDI3LjAKMCxTw7bEn8O8dMO2esO8LDAsMCwyOTAwLDQsNjYuMCwyNy4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsNTI1MCw0LDExMi4wLDI3LjAKMCxTw7bEn8O8dMO2esO8LDAsMCw0NjUwLDQsMTEyLjAsMjcuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDY1MDAsMSwyMTAuMCwyMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzc1MCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw5NDUwLDEsMTY1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExODAwLDEsMTk2LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExNDAwLDEsMTkwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDQ0NDUwLDQsNjI1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDQ0NDUwLDEsNjI1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc3NTAsMSwxNjAuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsNzc1MCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDkyMDAsMSwxNjAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsODAwMCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDkyMDAsMSwxNjAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzc1MCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw5NTAwLDEsMTY1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExNDAwLDEsMTkwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExODAwLDEsMTkwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDgxMDAsMSwxNjUuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsOTQ1MCwxLDE2NS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3OTUwLDEsMTY1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDgxMDAsMSwxNjUuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzk1MCwxLDE2NS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3OTUwLDEsMTY1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExNzUwLDEsMTk0LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExODAwLDEsMTk2LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExODAwLDEsMTk2LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDE1NzAwLDEsMzI1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDk1MDAsMSwxNjUuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsNzAwMCw1LDE2OS4wLDIyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxNTcwMCwxLDMyNS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw1MjUwLDYsMTY1LjAsMjUuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExMDAwLDExLDMzMC4wLDI1LjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxNTAwMCwxMywzMzAuMCwyNS4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMjYwMDAsMjQsNjYwLjAsMjUuMAowLFPDtsSfw7x0w7Z6w7wsMSwwLDEyMDAwLDYsMjI1LjAsMjIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExODAwLDEsMTk2LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc3NTAsMSwxNjAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzc1MCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc3NTAsMSwxNjAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE3NTAsMSwxOTQuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsNDUwMCwyLDEwMy4wLDI0LjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMTgwMCwxLDE5MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzIuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDI3NTAsMyw2Ni4wLDMzLjAKMCxTw7bEn8O8dMO2esO8LDAsMCwxMDAwMCw2LDE5MC4wLDI5LjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3OTUwLDEsMTY1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExODAwLDEsMTk2LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExODAwLDEsMTk2LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDMwMCwxLDY1LjAsMzIuMAowLFPDtsSfw7x0w7Z6w7wsMSwwLDU1MDAsMSwxODcuMCwyNC4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsMzUwMCwxLDk1LjAsMjAuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDgxMDAsMSwxNjUuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE4MDAsMSwxOTYuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsOTk1MCwxLDE2NS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMTgwMCwxLDE5MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMTgwMCwxLDE5Ni4wLDMyLjAKMCxTw7bEn8O8dMO2esO8LDAsMCwzNTAwLDMsNjYuMCwyNy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTA3NTAsMSwxNjkuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTIwMDAsMSwxOTYuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzc1MCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3OTUwLDEsMTY1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMSwwLDU5MDAsNCwxNDAuMCwyMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNDI1MCwzLDg0LjAsMjcuMAowLFPDtsSfw7x0w7Z6w7wsMSwwLDMwMDAwLDksNTAwLjAsMjQuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc3NTAsMSwxNjAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsOTIwMCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMTQwMCwxLDE5MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMTgwMCwxLDE5Ni4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMDUwMCwxLDIxNS4wLDMwLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw0NDQ1MCw0LDYyNS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDgxMDAsMSwxNjUuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE0MDAsMSwxOTAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE3NTAsMSwxOTQuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsNzUwMCw3LDE2OC4wLDIyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxNTkwMCwxLDMzMC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw0NDQ1MCw0LDYyNS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDkyMDAsMSwxNjAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzk1MCwxLDE2NS4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDk1MDAsMSwxNjUuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsMTE3NTAsMSwxOTAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzc1MCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMTgwMCwxLDE5Ni4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw4MDAwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc3NTAsMSwxNjAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE3NTAsMSwxOTQuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE4MDAsMSwxOTYuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsNTAwMCw0LDExMi4wLDI3LjAKMSxTw7bEn8O8dMO2esO8LDAsMCw0ODUwLDMsMTEyLjAsMjcuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDMzMDAsMSw4NC4wLDI3LjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3OTUwLDEsMTY1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExNDAwLDEsMTkwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMSwxLDQwMDAsMyw2MC4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw5MjAwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExODAwLDEsMTk2LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDg1MDAsMywxNjUuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsMjgwMCwzLDg0LjAsMjcuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc5NTAsMSwxNjUuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE4MDAsMSwxOTYuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTEyMDAsMSwxNjkuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTYxMDAsMiwzMjUuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsODAwMCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMTQwMCwxLDE5MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMjAwMCw1LDE5Ni4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3OTUwLDEsMTY1LjAsMzIuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDgwMDAsMSwxNjAuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE3NTAsMSwxOTQuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE4MDAsMSwxOTYuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsODAwMCw0LDIxMC4wLDIxLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw4MDAwLDEsMTYwLjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc3NTAsMSwxNjAuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsODEwMCwxLDIyMC4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw5NTUwLDEsMTYwLjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDk1MDAsMSwxNjUuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTIwMDAsMSwxOTAuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE0MDAsMSwxOTAuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE3NTAsMSwxOTQuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTE4MDAsMSwxOTYuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTEyMDAsMSwyMDAuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTU3MDAsMSwzMzUuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMjA3MDAsMSwzNjEuMCwzMy4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsMTIwMDAsNiwyNzUuMCwxNi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsODAwMCwxLDE2MC4wLDMyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc3NTAsMSwxNjAuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsOTUwMCwxLDE2NS4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw4MTAwLDEsMTY1LjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc5NTAsMSwxNjUuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTEyMDAsMSwxOTYuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsMTU1MDAsMTAsNDIwLjAsMjIuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDgwMDAsMSwyMjAuMCwzMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsMTIwMDAsMSwxODkuMCwyOC4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTIwMDAsMSwyMTUuMCwzMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMzAwMDAsMzAsNjcyLjAsMjIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDEyMDAwLDEwLDIxNS4wLDMyLjAKMCxTw7bEn8O8dMO2esO8LDAsMCwxMjAwMCw1LDMwMC4wLDEyLjAKMCxTw7bEn8O8dMO2esO8LDEsMCw1MDAwLDcsMjYwLjAsMzAuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDk1MDAsMywxNjUuMCwzMy4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsMjUwMDAsMTQsNTEwLjAsMjMuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDYwMDAsMSwyMTAuMCwyMi4wCjAsU8O2xJ/DvHTDtnrDvCwxLDAsMzc1MCw4LDMyMC4wLDI1LjAKMCxTw7bEn8O8dMO2esO8LDEsMCw5MDAwLDE2LDY0MC4wLDI1LjAKMCxTw7bEn8O8dMO2esO8LDAsMCw4MDAwLDUsMjIwLjAsMzIuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDc2MDAsNSwxNzAuMCwyNS4wCjAsU8O2xJ/DvHTDtnrDvCwxLDAsODk1MCw2LDIyOS4wLDI3LjAKMCxTw7bEn8O8dMO2esO8LDEsMCw0NTAwLDgsMzMwLjAsMjYuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDE2MDAwLDEsNDIwLjAsMjIuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDcwMDAsMSwxNzAuMCwyMi4wCjEsU8O2xJ/DvHTDtnrDvCwxLDAsMTQ1MDAsMyw0MjAuMCwyMi4wCjEsU8O2xJ/DvHTDtnrDvCwxLDAsODAwMCwzLDIxMC4wLDIyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxOTUwMCwzLDYzMC4wLDIyLjAKMSxTw7bEn8O8dMO2esO8LDEsMCw4NTAwLDEsMjEwLjAsMjIuMAoxLFPDtsSfw7x0w7Z6w7wsMSwwLDE0NzUwLDMsNDIwLjAsMjIuMAoxLFPDtsSfw7x0w7Z6w7wsMSwwLDc1MDAsMywyMTAuMCwyMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTIwMDAsMSw0MjAuMCwyMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMjQ1MDAsMSw4NDAuMCwyMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTUwMDAsMSw0MjAuMCwyMi4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzAwMCwxLDIxMC4wLDIyLjAKMCxTw7bEn8O8dMO2esO8LDAsMCw1MDAsMSw2LjAsMjAuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDUwOSwxLDEyLjAsMTguMAowLFPDtsSfw7x0w7Z6w7wsMSwwLDU2NTAsNCwxNDMuMCwyNy4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsMTIwMDAsOCwzODAuMCw0LjAKMCxTw7bEn8O8dMO2esO8LDAsMCw2OTUwLDcsMjEyLjAsNC4wCjAsU8O2xJ/DvHTDtnrDvCwxLDAsNDAwNSwxLDExMy4wLDI0LjAKMCxTw7bEn8O8dMO2esO8LDEsMCw0NjM1LDEsMTAzLjAsMjQuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDEyMDAwLDEsMTkwLjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDgxMDAsMSwxNjUuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzc1MCwxLDE2MC4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw5NTUwLDEsMTYwLjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDk0NTAsMSwxNjUuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsMTYyMDAsMSwzMzAuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsOTUwMCwxLDE2NS4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3NzUwLDEsMTYwLjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDkyMDAsMSwxNjAuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzkwMCwxLDE2MC4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw5NTAwLDEsMTY1LjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDExNDAwLDEsMTkwLjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDEyMDAwLDEsMTkwLjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDgxMDAsMSwxNjUuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsNzk1MCwxLDE2NS4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw3OTUwLDEsMTY1LjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDk4NTAsMSwxOTYuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsOTg1MCwxLDE5Ni4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxNTkwMCwxLDMzMC4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw5MjAwLDEsMTYwLjAsMzMuMAoxLFPDtsSfw7x0w7Z6w7wsMCwwLDgxMDAsMSwxNjUuMCwzMy4wCjEsU8O2xJ/DvHTDtnrDvCwwLDAsODAwMCwxLDE2MC4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMDAwMCwxLDE5Ni4wLDMzLjAKMSxTw7bEn8O8dMO2esO8LDAsMCwxMjAwMCwxLDQyMC4wLDIzLjAKMCxTw7bEn8O8dMO2esO8LDAsMCwyNDAwMCw0LDY3Mi4wLDIyLjAKMCxTw7bEn8O8dMO2esO8LDAsMCwxMjAwMCwyLDMzNi4wLDIyLjAKMSxTw7bEn8O8dMO2esO8LDAsMCw4NTAwLDEsMjIwLjAsMjkuMAowLFPDtsSfw7x0w7Z6w7wsMCwwLDYwMDAsMSwxNjguMCwyMi4wCjAsU8O2xJ/DvHTDtnrDvCwwLDAsNTQ2MCwxLDE4Ny4wLDI0LjAK'
text =  base64.b64decode(data).decode('UTF-8')
f = open("temp_file.csv", "w")
f.write(text)
f.close()
df = pd.read_csv("temp_file.csv") 

records_ = df.to_dict(orient = 'records')
db.Emp.insert_many(records_ )


