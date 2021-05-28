
lst = [5, 3, 5, 2, 6, 9, 3]
counts = {}
for item in set(lst):
	counts[item] = set(lst).count(item)

print(counts)