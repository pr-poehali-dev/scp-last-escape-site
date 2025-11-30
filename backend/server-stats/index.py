'''
Business: Получение статистики игрового сервера Garry's Mod через Source Query Protocol
Args: event - dict с httpMethod, queryStringParameters (ip, port)
      context - object с request_id, function_name
Returns: JSON с данными о сервере (онлайн, максимум игроков, название, карта)
'''

import socket
import struct
import json
from typing import Dict, Any, Tuple, Optional

def query_server(ip: str, port: int, timeout: int = 3) -> Optional[Dict[str, Any]]:
    A2S_INFO = b'\xFF\xFF\xFF\xFF\x54Source Engine Query\x00'
    
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.settimeout(timeout)
        
        sock.sendto(A2S_INFO, (ip, port))
        data, _ = sock.recvfrom(4096)
        sock.close()
        
        if len(data) < 6:
            return None
            
        header = struct.unpack('<l', data[0:4])[0]
        if header != -1:
            return None
            
        response_type = data[4]
        if response_type != 0x49:
            return None
        
        pos = 6
        
        def read_string(data: bytes, start: int) -> Tuple[str, int]:
            end = data.find(b'\x00', start)
            if end == -1:
                return '', start
            return data[start:end].decode('utf-8', errors='ignore'), end + 1
        
        server_name, pos = read_string(data, pos)
        map_name, pos = read_string(data, pos)
        folder, pos = read_string(data, pos)
        game, pos = read_string(data, pos)
        
        if pos + 2 > len(data):
            return None
            
        players = data[pos]
        max_players = data[pos + 1]
        
        return {
            'name': server_name,
            'map': map_name,
            'game': game,
            'players': players,
            'max_players': max_players,
            'online': True
        }
        
    except socket.timeout:
        return None
    except Exception:
        return None

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters', {}) or {}
    ip = params.get('ip', '194.93.2.148')
    port_str = params.get('port', '27015')
    
    try:
        port = int(port_str)
    except ValueError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid port number'})
        }
    
    stats = query_server(ip, port)
    
    if stats is None:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'online': False,
                'players': 0,
                'max_players': 64,
                'name': 'SCP Foundation: Last Escape',
                'map': 'Unknown',
                'game': 'Garry\'s Mod'
            })
        }
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps(stats)
    }
